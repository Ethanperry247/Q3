module.exports = function createUpdateCalibrate({ database, calibrate }) {
    return async function updateCalibrate(state) {
        try {
            // If changing the state to false, update the DB.
            if (state === false) {
                await database.updateMachineCalibration(false);
            } 
            // Otherwise, update the DB and calibrate the motor.
            else if (!(await database.getMachine().motorCalibrating)) {
                await database.updateMachineCalibration(true);
                calibrate();
            }
        } catch (e) {
            throw e;
        }
    };
};