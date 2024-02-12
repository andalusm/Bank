"use strict";
const nodemailer = require("nodemailer");

const TOKEN = "d7de8e91a50acb22975ccf241607728a";
const SENDER_EMAIL = "mailtrap@bank.com";
const RECIPIENT_EMAIL = "andalos2007@hotmail.com";



class mailManager {
    static async sendEmail(userEmail) {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "andalusmh2002@gmail.com",
                pass: "wbjp aqfa qxqe arsy",
            },
        });
        const mailOptions = {
            from: "andalusmh2002@gmail.com",
            to: userEmail,
            subject: "Hello from Bank",
            text: "Thank you for registering to Bank please enjoy!",
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email: ", error);
            } else {
                console.log("Email sent: ", info.response);
            }
        });

    }
}

module.exports = mailManager