const nodemailer = require('nodemailer');
const EmailClient = require('./client');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "alpineemailserver@gmail.com",
        pass: "f57fd01c-10b2-40ef-80f1-d0ca3b15494c"
    }
});

const emailClient = new EmailClient(transporter);

module.exports = emailClient;