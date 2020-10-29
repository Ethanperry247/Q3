module.exports = function createGetBoxCount({ database }) {
    return async function getBoxCount() {
        try {
            return await database.getBoxCount();
        } catch (e) {
            throw e;
        }
    };
};