const models = require('../models');

module.exports = function createAddCup({ database }) {
    return async function addCup(cupInfo) {
        try {
            const cup = new models.Cup(cupInfo);
            return await database.insertCup(cup);
        } catch (e) {
            throw e;
        }
    };
};