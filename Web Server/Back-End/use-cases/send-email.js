module.exports = CreateSendEmail = ({ emailClient }) => {
    return (recipient, subject, email) => {
        try {
            emailClient.sendEmail(recipient, subject, email);
        } catch (e) {
            throw e;
        }
    };
};