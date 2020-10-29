const createGetBoxCount = require('./get-box-count.js');
const createGetBox = require('./get-box.js');
const createGetCupCount = require('./get-cup-count.js');
const createGetCup = require('./get-cup.js');
const createPostBox = require('./post-box.js');
const createPostCup = require('./post-cup.js');
const { addBox, addCup, getBoxCount, getBox, getCupCount, getCup } = require('../use-cases');

const getBoxCountController = createGetBoxCount({ getBoxCount });
const getBoxController = createGetBox({ getBox });
const getCupCountController = createGetCupCount({ getCupCount });
const getCupController = createGetCup({ getCup });
const postBoxController = createPostBox({ addBox });
const postCupController = createPostCup({ addCup });

module.exports = { 
    getBoxCountController,
    getBoxController,
    getCupCountController,
    getCupController,
    postBoxController,
    postCupController,
};