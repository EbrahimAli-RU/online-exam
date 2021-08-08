const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const User = require('../model/user')
const catchAsync = require('../utils/catchAsync')
const appError = require('../utils/appError')
const sendMail = require('../utils/email')
const { dataValidity, validateEmail } = require('../utils/validity')
const { promisify } = require('util')


const signToken = id => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE })
}

exports.registerWithEmailVerification = catchAsync(async (req, res, next) => {
    const { userName, email, password, confirmPassword } = req.body
    const result = dataValidity(userName.trim(), email.trim().toLowerCase(), password.trim(), confirmPassword.trim())
    if (result) {
        return next(new appError(result.message, result.statusCode))
    }
    const user = await User.findOne({ email })
    if (user) {
        return next(new appError(`This email is already exist, please try another one`, 400))
    }
    const token = await jwt.sign({
        userName,
        email,
        password,
        confirmPassword
    }, process.env.PRIVATE_KEY, { expiresIn: '15m' })
    const activationUrl = `${process.env.CLIENT_URL}/user/activation/${token}`

    try {
        await sendMail({
            to: email,
            subject: `Active your account`,
            txt: `Active Acount`,
            url: activationUrl
        })
        res.status(200).json({
            status: 'success',
            message: `Send an Email to ${email}`
        })
    } catch (err) {
        return next(new appError(`There is an error sending email, please try again later`, 500))
    }

})

exports.activation = catchAsync(async (req, res, next) => {
    const { activationToken } = req.body
    jwt.verify(activationToken, process.env.PRIVATE_KEY, async function (err, decoded) {
        if (err) {
            switch (err.name) {
                case 'TokenExpiredError':
                    return next(new appError(`This token is no longer valid`, 400))
                case 'JsonWebTokenError':
                    return next(new appError(`Not a Valid Token`, 400))
            }
        } else {
            const newUser = await User.create({
                userName: decoded.userName,
                email: decoded.email,
                password: decoded.password,
                confirmPassword: decoded.confirmPassword
            })

            res.status(201).json({
                status: 'success',
                user: {
                    ...newUser,
                    token: signToken(newUser._id)
                }
            })

        }
    });
})

exports.withOutEmailVerificationRegister = catchAsync(async (req, res, next) => {
    const user = await User.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            user
        }
    })
})

exports.signIn = catchAsync(async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return next(new appError(`Please provide email and password`, 400))
    }
    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await user.checkPassword(password, user.password))) {
        return next(new appError(`Invalid email or password`))
    }

    res.status(200).json({
        status: 'success',
        data: {
            user: user._id,
            token: signToken(user._id)
        },
        message: `Logged in Successfully!`
    })
})

exports.protected = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization || req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    if (!token) {
        return (new appError(`You are not logged in! please login.`, 401))
    }

    const decoded = promisify(jwt.verify)(token, process.env.ACCESS_TOKEN_SECRET_KEY)
    const loggedInUser = await User.findById(decoded.id)
    if (!loggedInUser) {
        return next(new appError('The user belonging to this token does not exist', 401))
    }

    req.user = loggedInUser
    next()
})


exports.forgotPassword = catchAsync(async (req, res, next) => {
    const { email } = req.body
    const user = await User.findOne({ email });
    if (!user) {
        return next(new appError(`No user with this email`, 404))
    }
    const resetToken = user.createPasswordResetToken()
    await user.save({ validateBeforeSave: false })
    const forgotPasswordUrl = `${process.env.CLIENT_URL}/user/forgotPassword/${resetToken}`
    try {
        await sendMail({
            to: email,
            subject: `Reset your password`,
            txt: `Reset Password`,
            url: forgotPasswordUrl
        })

        res.status(200).json({
            status: 'success',
            message: `E-Mail send to to ${email}`
        })
    } catch (err) {
        user.passwordResetToken = undefined
        user.passwordResetExpire = undefined
        await user.save({ validateBeforeSave: false })
        return next(new appError(`There is an error sending email, please try again later`, 500))
    }
})

exports.resetPassword = catchAsync(async (req, res, next) => {
    const { resetToken, password, confirmPassword } = req.body
    const resethashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const user = await User.findOne({ passwordResetToken: resethashedToken, passwordResetExpire: { $gt: Date.now() } });
    if (!user) {
        return next(new appError(`Token is invalid or expired`, 400))
    }
    user.password = password
    user.confirmPassword = confirmPassword
    user.passwordResetToken = undefined
    user.passwordResetExpire = undefined
    await user.save()

    res.status(200).json({
        status: 'success',
        data: {
            id: user._id,
            token: signToken(user._id)
        }
    })
})

exports.updatePassword = catchAsync(async (req, res, next) => {
    const { currentPassword, password, confirmPassword } = req.body
    const user = await User.findById(req.user.id).select('+password')
    if (!(await user.checkPassword(currentPassword, user.password))) {
        return next(new appError(`Your current password is not valid`, 401))
    }
    user.password = password
    user.confirmPassword = confirmPassword
    await user.save()
    res.status(200).json({
        status: 'success',
        data: {
            id: user._id,
            token: signToken(user._id)
        }

    })

})

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError('You do not have permission to perform this action', 403)
            );
        }

        next();
    };
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find()
    res.status(200).json({
        status: 'success',
        users
    })
})