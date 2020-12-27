module.exports = function createGetMachine({ database }) {
    return async function getMachine() {
        try {
            return await database.getLatestMachine();
        } catch (e) {
            throw e;
        }
    };
};