module.exports = function createGetBoxesForTimeframeController({ getBoxesForTimeframe }) {
    return async function getBoxesForTimeframeController(httpRequest) {
        try {

            // Send back a JSON payload.
            const headers = {
                'Content-Type': 'application/json'
            };

            const boxes = await getBoxesForTimeframe(httpRequest.params.start, httpRequest.params.end);

            return {
                headers: headers,
                statusCode: 200,
                body: {
                    boxes: boxes,
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