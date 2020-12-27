module.exports = function createPostBoxCount({ database }) {
    return async function postBoxCount(count) {
        try {
            await database.updateBoxSize(count);
        } catch (e) {
            throw e;
        }
    };
};