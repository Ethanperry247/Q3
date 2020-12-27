module.exports = function createSendEmailController({ sendEmail }) {
    return async function sendEmailController(httpRequest) {
        try {
            
            // Send back a JSON payload.
            const headers = {
                'Content-Type': 'application/json'
            };

            const success = sendEmail("ethanperry247@gmail.com", "An email", "An email");

            return {
                headers: headers,
                statusCode: 200,
                body: {
                    success: success
                }
            };

        } catch (e) {
            // TODO: Do error logging here!

            console.log(e);

            return {
                headers: {
                  'Content-Type': 'application/json'
                },
                statusCode: 400,
                body: {
                  error: e.message
                }
            };
        }
    };
};