module.exports = function createUpdateSequence({ database, alterSequence }) {
    return async function updateSequence(state) {
        try {
            // If changing the state to false, update the DB.
            if (state === false) {
                await database.updateMachineSequence(false);
            } 
            // Otherwise, update the DB and sequence.
            else if (!(await database.getMachine().sequencing)) {
                await database.updateMachineSequence(true);
                alterSequence();
            }
        } catch (e) {
            throw e;
        }
    };
};