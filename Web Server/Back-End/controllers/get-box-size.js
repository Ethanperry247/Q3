module.exports = function createGetBoxSize({ getBoxSize }) {
    return async function getBoxSizeController(httpRequest) {
        try {

            // Send back a JSON payload.
            const headers = {
                'Content-Type': 'application/json'
            };

            // Wait for the cup count from the database.
            const size = await getBoxSize();

            return {
                headers: headers,
                statusCode: 200,
                body: {
                    size: size,
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