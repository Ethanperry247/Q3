module.exports = function createGetCupTypes({ getCupTypes }) {
    return async function getCupTypesController(httpRequest) {
        try {

            // Send back a JSON payload.
            const headers = {
                'Content-Type': 'application/json'
            };

            // Wait for the cup count from the database.
            const types = await getCupTypes();

            return {
                headers: headers,
                statusCode: 200,
                body: {
                  types: types,
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