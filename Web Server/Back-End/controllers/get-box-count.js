module.exports = function createGetBoxCount({ getBoxCount }) {
    return async function getBoxCountController(httpRequest) {
        try {

            // Send back a JSON payload.
            const headers = {
                'Content-Type': 'application/json'
            };

            // Wait for the cup count from the database.
            const boxCount = await getBoxCount();

            return {
                headers: headers,
                statusCode: 200,
                body: {
                    boxCount: boxCount,
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