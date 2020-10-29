module.exports = function createGetCup({ database }) {
    return async function getCup(cupId) {
        try {
            return await database.findCupById(cupId);
        } catch (e) {
            throw e;
        }
    };
};