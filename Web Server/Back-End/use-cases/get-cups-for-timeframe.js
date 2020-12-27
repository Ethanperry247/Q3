const models = require('../models');

module.exports = function createGetCupsForTimeframe({ database }) {
    return async function getCupsForTimeframe(startTime, endTime) {
        try {
            const timeFrame = new models.TimeFrame({ startTime, endTime });
            return await database.findCupsByTimeframe(timeFrame);
        } catch (e) {
            throw e;
        }
    };
};