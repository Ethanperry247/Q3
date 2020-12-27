module.exports = function createGetType({ database }) {
    return async function getType() {
        try {
            return await database.getCurrentType();
        } catch (e) {
            throw e;
        }
    };
};