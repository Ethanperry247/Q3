module.exports = function createGetMachine({ getMachine }) {
    return async function getMachineController(httpRequest) {
        try {

            // Send back a JSON payload.
            const headers = {
                'Content-Type': 'application/json'
            };

            // Wait for the cup count from the database.
            const machine = await getMachine();

            return {
                headers: headers,
                statusCode: 200,
                body: {
                  machine: machine,
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