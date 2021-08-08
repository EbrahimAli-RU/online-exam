const nodemailer = require('nodemailer')

const sendMail = async options => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_FROM,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    let EmailOption = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html:
            `<div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
        <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the Book Selling.</h2>
        <p>Congratulations! You're almost set to start using account.
            Just click the button below to validate your email address.
        </p>
        
        <a href=${options.url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px auto; display: inline-block;">${options.txt}</a>
    
        <p>If the button doesn't work for any reason, you can also click on the link below:</p>
    
        <div>${options.url}</div>
        </div>`
    }

    await transporter.sendMail(EmailOption);
}

module.exports = sendMail