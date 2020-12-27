const express = require('express');
const bodyParser = require('body-parser');
const createCallback = require('./createCallback.js');
const dotenv = require('dotenv');
const { 
    getBoxCountController,
    getBoxController,
    getCupCountController,
    getCupController,
    postBoxController,
    postCupController,
    getBoxesForTimeframeController,
    getCupsForTimeframeController,
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
} = require('./controllers');

dotenv.config();
const port = 3000;
const apiRoot = `http://localhost:${port}`;
const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// Deprecated routes.
// app.post(`/api/type/:type/boxId/:boxId`, createCallback(postCupController)); // Create a new cup (given a cup and a boxID).
// app.post(`/api/size/:size`, createCallback(postBoxController)); // Create a new box (given a size).

// Creating new items.
app.post(`/api/boxcount/:count`, createCallback(postBoxCountController)); // User changes the wanted box count.
app.post(`/api/cup/add`, createCallback(postCupController)); // Adds a new cup.

// Altering machine state.
app.post(`/api/conveyor`, createCallback(updateConveyorController)); // Alters the desired state of the conveyor.
app.post(`/api/lid`, createCallback(updateLidController)); // Alters the desired state of the lid.
app.post(`/api/calibrate/:state`, createCallback(updateCalibrateController)); // Calibrates the motor controller.
app.post(`/api/sequence/:state`, createCallback(updateSequenceController)); // Initiates the sequence for a new box.
app.post(`/api/reset`, () => {}); // Resets the machine and machine gateway.

// Get machine state.
app.get(`/api/machine`, createCallback(getMachineController)); // Gets the latest machine.
app.get(`/api/conveyor`, () => {}); // Alters the conveyor state.
app.get(`/api/lid`, () => {}); // Alters the lid state.
app.get(`/api/calibrate`, () => {}); // Triggers a calibration.
app.get(`/api/sequence`, () => {}); // Triggers a sequence.

// Querying machine state.
app.get(`/api/conveyor`, () => {}); // Queries the state of the conveyor.
app.get(`/api/lid`, () => {}); // Queries the state of the lid.


// Alter cup type.
app.post('/api/cups/type', createCallback(alterTypeController)); // Changes the cup type.
app.get('/api/cups/type', createCallback(getTypeController)); // Gets the cup type.

// Querying items.
app.get(`/api/box/size`, createCallback(boxSize)); // Gets the count of cups to be loaded into a box.
app.get(`/api/cups/count`, createCallback(currentBoxCups)); // Gets the number of cups in the current box.
app.get(`/api/cups/types`, createCallback(getCupTypesController)); // Gets the possible cup types.
app.get(`/api/cups/:id`, createCallback(getCupController)); // Gets a cup with a particular ID.
app.get(`/api/boxes/:id`, createCallback(getBoxController)); // Gets a box with a particuar ID.
app.get(`/api/cups`, createCallback(getCupCountController)); // Gets the total count of cups.
app.get(`/api/boxes`, createCallback(getBoxCountController)); // Gets the total count of boxes.
app.get(`/api/cups/timeframe/:start/:end`, createCallback(getCupsForTimeframeController)); // Gets all cups within the desired timeframe.
app.get(`/api/boxes/timeframe/:start/:end`, createCallback(getBoxesForTimeframeController)); // Gets all boxes within the desired timeframe.

// Email.
app.post(`/api/email`, createCallback(sendEmailController)); // Sends an email.

// Returns the interface.
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


app.listen(port, () => {
    console.log('Server is listening on port 3000');
});

