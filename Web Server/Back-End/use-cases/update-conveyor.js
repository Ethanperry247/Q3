module.exports = function createUpdateConveyor({ database, alterConveyor }) {
    return async function updateConveyor() {
        try {
            const state = (await database.getMachine()).conveyorstate;
            // If the conveyor is not running, change state in the DB and begin running.
            if (state === false) {
                await database.updateMachineConveyor(true);
                alterConveyor(true);
            } 
            else {
                await database.updateMachineConveyor(false);
                alterConveyor(false);
            }
        } catch (e) {
            throw e;
        }
    };
};