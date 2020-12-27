module.exports = function createAddCup({ database, sequence }) {
    return async function addCup() {
        try {

            // If the DB is empty, create a new box and insert the cup.
            if (Number(await database.getBoxCount()) === 0) {
                await database.insertBox();
                await database.insertCup();
                return;
            }

            // Check how many cups are in the current box.
            // If it is one less than the max, quickly sequence the mechanism.
            if (Number(await database.getBoxRemainder()) === 1) {
                await sequence();
                await database.updateMachineSequence(true);
                await database.insertCup();
                await database.insertBox();
            } else {
                await database.insertCup();
            }
        } catch (e) {
            throw e;
        }
    };
};