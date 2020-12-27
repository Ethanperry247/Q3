module.exports = function createGetCurrentBoxCups({ getCurrentBoxCups }) {
    return async function getCurrentBoxCupsController(httpRequest) {
        try {

            // Send back a JSON payload.
            const headers = {
                'Content-Type': 'application/json'
            };

            // Wait for the cup count from the database.
            const count = await getCurrentBoxCups();

            return {
                headers: headers,
                statusCode: 200,
                body: {
                    count: count,
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