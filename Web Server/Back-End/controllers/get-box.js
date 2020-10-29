module.exports = function createGetBox({ getBox }) {
    return async function getBoxController(httpRequest) {
        try {

            // Send back a JSON payload.
            const headers = {
                'Content-Type': 'application/json'
            };

            // Wait for the cup count from the database.
            const box = await getBox(Number(httpRequest.params.id));

            return {
                headers: headers,
                statusCode: 200,
                body: {
                    box: box,
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