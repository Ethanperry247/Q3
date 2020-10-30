const express = require('express');
const bodyParser = require('body-parser');
const createCallback = require('./createCallback.js');
const { 
    getBoxCountController,
    getBoxController,
    getCupCountController,
    getCupController,
    postBoxController,
    postCupController,
} = require('./controllers');

const port = 3000;
const apiRoot = `http://localhost:${port}`;
const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// Routes
app.post(`/type/:type/boxId/:boxId`, createCallback(postCupController));
app.post(`/size/:size`, createCallback(postBoxController));

app.post(`/conveyor/:desiredState`, () => {}); // Alters the desired state of the conveyor.
app.post(`/lid/:desiredState`, () => {}); // Alters the desired state of the lid.
app.post(`/calibrate`, () => {}); // Calibrates the motor controller.

app.get(`/cups`, createCallback(getCupCountController));
app.get(`/boxes`, createCallback(getBoxCountController));
app.get(`/cups/:id`, createCallback(getCupController));
app.get(`/boxes/:id`, createCallback(getBoxController));
app.get(`/cups/timeframe/:start-:finish`, () => {}); // Gets all cups within the desired timeframe.
app.get(`/boxes/timeframe/:start-:finish`, () => {}); // Gets all boxes within the desired timeframe.

app.get(`/conveyor`, () => {}); // Queries the state of the conveyor.
app.get(`/lid`, () => {}); // Queries the state of the lid.

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


app.listen(port, () => {
    console.log('Server is listening on port 3000');
});

