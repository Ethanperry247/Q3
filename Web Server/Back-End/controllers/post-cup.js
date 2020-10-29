module.exports = function createPostCup({ addCup }) {
    return async function postCup(httpRequest) {
        try {
            
            // Send back a JSON payload.
            const headers = {
                'Content-Type': 'application/json'
            };

            const cupId = await addCup({ 
                type: httpRequest.params.type,
                boxId: httpRequest.params.boxId,
                wasManuallyCreated: false,
            });

            return {
                headers: headers,
                statusCode: 200,
                body: {
                  cupId: cupId,
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