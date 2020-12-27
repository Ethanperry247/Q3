module.exports = function createUpdateLid({ database, alterLid }) {
    return async function updateLid() {
        try {
            const state = (await database.getMachine()).lidstate;
            // If lid is closed in the db, open and change state.
            if (state === false) {
                await database.updateMachineLid(true);
                alterLid(true);
            } 
            else {
                await database.updateMachineLid(false);
                alterLid(false);
            }
        } catch (e) {
            throw e;
        }
    };
};