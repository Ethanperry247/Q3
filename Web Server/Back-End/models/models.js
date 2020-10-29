// A cup which has passed by a sensor at a particular timestamp.
// The cup's type has been labeled in the web application.
module.exports.Cup = class Cup {
    constructor({ type, boxId, wasManuallyCreated }) {
        this._type = type;
        this._boxId = boxId;
        this._wasManuallyCreated = wasManuallyCreated;
    }

    get type() {
        return this._type;
    }

    get boxId() {
        return this._boxId;
    }

    get wasManuallyCreated() {
        return this._wasManuallyCreated;
    }
};

// Box which is filled with cups on the conveyor line.
module.exports.Box = class Box {
    constructor({ size }) {
        if (size < 1) {
            throw new Error("Size cannot be less than 1!");
        }
        this._size = size;
    }

    get size() {
        return this._size;
    }
};

// A device which represents the state of the actual, physical device.
module.exports.Device = class Device {
    constructor({
        lidState, 
        conveyorState, 
        isMotorCalibrating,
        totalCupsProduced,
        cupsPerBox,
        cupsInCurrentBox,
        totalBoxesProduced
    }) {
        this._lidState = lidState; // Open or closed.
        this._conveyorState = conveyorState; // Running or stopped.
        this._isMotorCalibrating = isMotorCalibrating; // Boolean.
        this._totalCupsProduced = totalCupsProduced;
        this._cupsPerBox = cupsPerBox;
        this._cupsInCurrentBox = cupsInCurrentBox;
        this._totalBoxesProduced = totalBoxesProduced;
    }
};