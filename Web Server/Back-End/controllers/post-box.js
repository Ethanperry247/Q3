module.exports = function createPostBox({ addBox }) {
    return async function postBox(httpRequest) {
        try {

            // Send back a JSON payload.
            const headers = {
                'Content-Type': 'application/json'
            };

            const boxId = await addBox({ 
                size: httpRequest.params.size,
            });

            return {
                headers: headers,
                statusCode: 200,
                body: {
                  boxId: boxId,
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