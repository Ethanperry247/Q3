const axios = require('axios');
const CreateAlterConveyor = require('./alter-conveyor');
const CreateAlterLid = require('./alter-lid');
const CreateAlterSequence = require('./alter-sequence');
const CreateCalibrate = require('./calibrate');
const CreateReset = require('./reset');

class HTTP {
    async post(url) {
        try {
            return await axios.post(url);
        } catch (e) {
            return e;
        }
    }

    async get(url) {
        try {
            return await axios.get(url);
        } catch (e) {
            return e;
        }
    }
}

const http = new HTTP();

const alterConveyor = CreateAlterConveyor({ http });
const alterLid = CreateAlterLid({ http});
const alterSequence = CreateAlterSequence({ http });
const calibrate = CreateCalibrate({ http });
const reset = CreateReset({ http });

module.exports = { alterConveyor, alterLid, alterSequence, calibrate, reset };