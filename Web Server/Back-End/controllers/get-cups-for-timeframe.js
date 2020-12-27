module.exports = function createGetCupsForTimeframeController({ getCupsForTimeframe }) {
    return async function getCupsForTimeframeController(httpRequest) {
        try {

            // Send back a JSON payload.
            const headers = {
                'Content-Type': 'application/json'
            };

            const cups = await getCupsForTimeframe(httpRequest.params.start, httpRequest.params.end);

            return {
                headers: headers,
                statusCode: 200,
                body: {
                    cups: cups,
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