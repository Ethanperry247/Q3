const createGetBoxCount = require('./get-box-count.js');
const createGetBox = require('./get-box.js');
const createGetCupCount = require('./get-cup-count.js');
const createGetCup = require('./get-cup.js');
const createPostBox = require('./post-box.js');
const createPostCup = require('./post-cup.js');
const createGetCupsForTimeframe = require('./get-cups-for-timeframe');
const createGetBoxesForTimeframe = require('./get-boxes-for-timeframe');
const createSendEmailController = require('./send-email');
const createUpdateCalibrate = require('./update-calibration');
const createUpdateConveyor = require('./update-conveyor');
const createUpdateLid = require('./update-lid');
const createUpdateSequence = require('./update-sequence');
const createGetMachine = require('./get-machine');
const createGetCupTypes = require('./get-cup-types');
const createAlterType = require('./post-type');
const createGetType = require('./get-type');
const createPostBoxCount = require('./post-box-count');
const createGetCurrentBoxCups = require('./get-current-box-cups');
const createGetBoxSize = require('./get-box-size');
const { 
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
 } = require('../use-cases');

const getBoxCountController = createGetBoxCount({ getBoxCount });
const getBoxController = createGetBox({ getBox });
const getCupCountController = createGetCupCount({ getCupCount });
const getCupController = createGetCup({ getCup });
const getCupTypesController = createGetCupTypes({ getCupTypes });
const postBoxController = createPostBox({ addBox });
const postCupController = createPostCup({ addCup });
const getCupsForTimeframeController = createGetCupsForTimeframe({ getCupsForTimeframe });
const getBoxesForTimeframeController = createGetBoxesForTimeframe({ getBoxesForTimeframe });
const sendEmailController = createSendEmailController({ sendEmail });
const updateCalibrateController = createUpdateCalibrate({ updateCalibrate });
const updateConveyorController = createUpdateConveyor({ updateConveyor });
const updateLidController = createUpdateLid({ updateLid });
const updateSequenceController = createUpdateSequence({ updateSequence });
const getMachineController = createGetMachine({ getMachine });
const alterTypeController = createAlterType({ postType });
const getTypeController = createGetType({ getType });
const postBoxCountController = createPostBoxCount({ postBoxCount });
const currentBoxCups = createGetCurrentBoxCups({ getCurrentBoxCups });
const boxSize = createGetBoxSize({ getBoxSize });


module.exports = { 
    getBoxCountController,
    getBoxController,
    getCupCountController,
    getCupController,
    postBoxController,
    postCupController,
    getCupsForTimeframeController,
    getBoxesForTimeframeController,
    sendEmailController,
    updateCalibrateController,
    updateConveyorController,
    updateLidController,
    updateSequenceController,
    getMachineController,
    getCupTypesController,
    alterTypeController,
    getTypeController,
    postBoxCountController,
    currentBoxCups,
    boxSize,
};