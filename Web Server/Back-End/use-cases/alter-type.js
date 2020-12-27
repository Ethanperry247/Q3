module.exports = function createAlterType({ database }) {
    return async function alterType(type) {
        try {
            await database.updateCupType(type);
        } catch (e) {
            throw e;
        }
    };
};