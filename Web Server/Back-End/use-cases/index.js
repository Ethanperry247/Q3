const createAddBox = require('./add-box.js');
const createAddCup = require('./add-cup.js');
const createGetBoxCount = require('./get-box-count.js');
const createGetBox = require('./get-box.js');
const createGetCupCount = require('./get-cup-count.js');
const createGetCup = require('./get-cup.js');
const createGetCupsForTimeframe = require('./get-cups-for-timeframe');
const createGetBoxesForTimeframe = require('./get-boxes-for-timeframe');
const createGetCupTypes = require('./get-cup-types');
const createSendEmail = require('./send-email');
const createAlterType = require('./alter-type');
const createGetType = require('./get-type');
const createPostBoxCount = require('./post-box-count');
const createGetCurrentBoxCups = require('./get-current-box-cups');
const createGetBoxSize = require('./get-box-size');
const database = require('../db');
const emailClient = require('../email');

const createUpdateCalibrate = require('./update-calibration');
const createUpdateConveyor = require('./update-conveyor');
const createUpdateLid = require('./update-lid');
const createUpdateSequence = require('./update-sequence');
const createGetMachine = require('./get-machine');
const { calibrate, alterConveyor, alterLid, alterSequence } = require("../outbound-networking");

const updateCalibrate = createUpdateCalibrate({ database, calibrate });
const updateConveyor = createUpdateConveyor({ database, alterConveyor });
const updateLid = createUpdateLid({ database, alterLid });
const updateSequence = createUpdateSequence({ database, alterSequence });
const getMachine = createGetMachine({ database });

// Inject DB and other required consts here.
const addBox = createAddBox({ database });
const addCup = createAddCup({ database, sequence: alterSequence });
const getBoxCount = createGetBoxCount({ database });
const getBox = createGetBox({ database });
const getCupCount = createGetCupCount({ database });
const getCup = createGetCup({ database });
const getCupsForTimeframe = createGetCupsForTimeframe({ database });
const getBoxesForTimeframe = createGetBoxesForTimeframe({ database });
const sendEmail = createSendEmail({ emailClient });
const getCupTypes = createGetCupTypes({ database });
const postType = createAlterType({ database });
const getType = createGetType({ database });
const postBoxCount = createPostBoxCount({ database });
const getCurrentBoxCups = createGetCurrentBoxCups({ database });
const getBoxSize = createGetBoxSize({ database });

module.exports = {
    addBox, 
    addCup, 
    getBoxCount, 
    getBox, 
    getCupCount, 
    getCup, 
    getCupsForTimeframe, 
    getBoxesForTimeframe, 
    sendEmail,
    updateCalibrate,
    updateConveyor,
    updateLid,
    updateSequence,
    getMachine,
    getCupTypes,
    postType,
    getType,
    postBoxCount,
    getCurrentBoxCups,
    getBoxSize,
};