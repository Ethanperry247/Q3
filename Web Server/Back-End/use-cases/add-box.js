module.exports = function createAddBox({ database }) {
    return async function addBox() {
        try {
            return await database.insertBox();
        } catch (e) {
            throw e;
        }
    };
};