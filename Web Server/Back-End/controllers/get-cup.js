module.exports = function createGetCup({ getCup }) {
    return async function getCupController(httpRequest) {
        try {

            // Send back a JSON payload.
            const headers = {
                'Content-Type': 'application/json'
            };

            // Wait for the cup count from the database.
            const cup = await getCup(Number(httpRequest.params.id));

            return {
                headers: headers,
                statusCode: 200,
                body: {
                  cup: cup,
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