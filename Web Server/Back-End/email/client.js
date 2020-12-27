module.exports = class EmailClient {
    constructor(transporter) {
        this.transporter = transporter;
    }

    sendEmail(recipient, subject, email) {
        const exampleEmail = {
            from: "alpineemailserver@gmail.com",
            to: recipient,
            subject: subject,
            plain: "",
            html: email,
        };

        this.transporter.sendMail(exampleEmail, (err, data) => {
            if (err) {
                throw(err);
            } else {
                console.log(data);
            }
        });
    }
};