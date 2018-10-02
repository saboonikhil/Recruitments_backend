var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pranav.karnan2016@vitstudent.ac.in',
        pass: '97062920'
    }
});

function sendOTP(otp,recipient) {
    return new Promise((resolve,reject) => {
        const mailOptions = {
            from: 'pranav.karnani2016@vitstudent.ac.in',
            to: recipient, 
            subject: "OTP to complete registration process for recruitments portal",
            html: `<p> OTP for registration is : ${otp}</p>`
        };

        process(mailOptions).then((info) => {
            return resolve(info);
        }).catch((error) => {
            return reject(error);
        });
    });
}


function process(mailOptions) {
    return new Promise((resolve,reject) => {
        transporter.sendMail(mailOptions, function (err, info) {
            if (err)
                return reject(err);
            else
                return resolve(info);
        });
    });
}

module.exports = {
    sendOTP
}
