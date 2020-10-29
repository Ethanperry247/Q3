module.exports = function createGetCupCount({ database }) {
    return async function getCupCount() {
        try {
            return await database.getCupCount();
        } catch (e) {
            throw e;
        }
    };
};