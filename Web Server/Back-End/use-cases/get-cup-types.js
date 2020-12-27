module.exports = function createGetCupTypes({ database }) {
    return async function getCupTypes() {
        try {
            return await database.getCupTypes();
        } catch (e) {
            throw e;
        }
    };
};