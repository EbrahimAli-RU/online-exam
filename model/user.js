const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        trim: true,
        required: [true, `Username is required`],
    },
    email: {
        type: String,
        trim: true,
        required: [true, `Email is required`],
        validate: [validator.isEmail, 'Not an email, please provide correct email'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, `Password is required`],
        minlength: 8,
        maxlength: 20,
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, `Password is required`],
        minlength: 8,
        maxlength: 20,
        validate: {
            validator: function (value) {
                return this.password === value
            },
            message: 'Confirm password is not same as password'
        }
    },
    passwordResetToken: String,
    passwordResetExpire: Date
}, { timestamps: true })


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined
    next();
})

userSchema.methods.checkPassword = async function (providedPassword, storedpassword) {
    return await bcrypt.compare(providedPassword, storedpassword);
}

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpire = Date.now() + 5 * 60 * 1000;

    return resetToken;
}

const User = mongoose.model('user', userSchema)

module.exports = User