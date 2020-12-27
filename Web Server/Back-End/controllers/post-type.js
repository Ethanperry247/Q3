module.exports = function createPostType({ postType }) {
    return async function postTypeController(httpRequest) {
        try {
            
            // Send back a JSON payload.
            const headers = {
                'Content-Type': 'application/json'
            };

            await postType(httpRequest.body.type);

            return {
                headers: headers,
                statusCode: 200,
                body: {
                    message: "Success",
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