const getCup = require("./get-cup");

module.exports = function createGetCupCount({ getCupCount }) {
    return async function getCupCountController(httpRequest) {
        try {

            // Send back a JSON payload.
            const headers = {
                'Content-Type': 'application/json'
            };

            // Wait for the cup count from the database.
            const cupCount = await getCupCount();

            return {
                headers: headers,
                statusCode: 200,
                body: {
                  cupCount: cupCount,
                }
            };

        } catch (e) {

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