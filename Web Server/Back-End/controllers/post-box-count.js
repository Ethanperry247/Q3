module.exports = function CreatePostBoxCount({ postBoxCount }) {
    return async function postBoxCountController(httpRequest) {
        try {

            // Send back a JSON payload.
            const headers = {
                'Content-Type': 'application/json'
            };

            await postBoxCount(httpRequest.params.count);

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