module.exports = function createUpdateSequence({ updateSequence }) {
    return async function updateSequenceController(httpRequest) {
        try {

            // Send back a JSON payload.
            const headers = {
                'Content-Type': 'application/json'
            };

            // Wait for the cup count from the database.
            await updateSequence(httpRequest.params.state);

            return {
                headers: headers,
                statusCode: 200,
                body: {
                    message: "Success",
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