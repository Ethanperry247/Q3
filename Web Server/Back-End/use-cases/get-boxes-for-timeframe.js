const models = require('../models');

module.exports = function createGetBoxesForTimeframe({ database }) {
    return async function getBoxesForTimeframe(startTime, endTime) {
        try {
            const timeFrame = new models.TimeFrame({ startTime, endTime });
            return await database.findBoxesByTimeframe(timeFrame);
        } catch (e) {
            throw e;
        }
    };
};