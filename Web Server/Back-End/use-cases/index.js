const createAddBox = require('./add-box.js');
const createAddCup = require('./add-cup.js');
const createGetBoxCount = require('./get-box-count.js');
const createGetBox = require('./get-box.js');
const createGetCupCount = require('./get-cup-count.js');
const createGetCup = require('./get-cup.js');
const database = require('../db');

// Inject DB and other required consts here.
const addBox = createAddBox({ database });
const addCup = createAddCup({ database });
const getBoxCount = createGetBoxCount({ database });
const getBox = createGetBox({ database });
const getCupCount = createGetCupCount({ database });
const getCup = createGetCup({ database });

module.exports = { addBox, addCup, getBoxCount, getBox, getCupCount, getCup };