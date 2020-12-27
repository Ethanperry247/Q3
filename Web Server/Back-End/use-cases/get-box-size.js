module.exports = function createGetBox({ database }) {
    return async function getBox() {
        try {
            return await database.getBoxSize();
        } catch (e) {
            throw e;
        }
    };
};