module.exports = function createGetBox({ database }) {
    return async function getBox(boxId) {
        try {
            const box = await database.findBoxById(boxId);
            const boxContents = await database.findCupsByBoxId(boxId);
            return {
                box,
                boxContents
            };
        } catch (e) {
            throw e;
        }
    };
};