module.exports = function createGetCurrentBoxCups({ database }) {
    return async function getCurrentBoxCups() {
        try {
            return await database.getCupsInCurrentBox();
        } catch (e) {
            throw e;
        }
    };
};