exports.dataValidity = (userName, email, password, confirmPassword) => {
    if (!userName || !email || !password || !confirmPassword) {
        return {
            message: `All fields are required`,
            statusCode: 400
        }
    } else if (!validateEmail(email)) {
        return {
            message: `Not an email, please provide a valid one!`,
            statusCode: 400
        }
    } else if (password.length < 8) {
        return {
            message: `Password must be at least 8 charecter`,
            statusCode: 400
        }
    } else if (confirmPassword.length < 8) {
        return {
            message: `confirmPassword must be at least 8 charecter`,
            statusCode: 400
        }
    } else if (password !== confirmPassword) {
        return {
            message: `Password is not equal to confirmpassword`,
            statusCode: 400
        }
    } else {
        return false
    }
}

const validateEmail = email => {
    return (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)
}