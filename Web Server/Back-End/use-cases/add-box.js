const models = require('../models');

module.exports = function createAddBox({ database }) {
    return async function addBox(boxInfo) {
        try {
            const box = new models.Box(boxInfo);
            return await database.insertBox(box);
        } catch (e) {
            throw e;
        }
    };
};