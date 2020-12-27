const endpoint = window.location.hostname;

// Gets the number of cups in the current box.
const GetCupsInCurrentBox = async () => {
    const response = await fetch('/api/cups/count');
    document.getElementById("curBoxCupCount").innerHTML = (await response.json()).count;
};

// Get the cups per each box.
const GetCupsPerBox = async () => {
    const response = await fetch('/api/box/size');
    document.getElementById("cupsPerBox").innerHTML = (await response.json()).size;
};

// Gets the total cups produced.
const GetTotalCups = async () => {
    const response = await fetch('/api/cups');
    document.getElementById("totalCups").innerHTML = (await response.json()).cupCount;
};

// Gets the total boxes produced.
const GetTotalBoxes = async () => {
    const response = await fetch('/api/boxes');
    document.getElementById("totalBoxes").innerHTML = (await response.json()).boxCount;
};

const GetCupsPerTime = async (startTime, endTime) => {
    // Time should be given in number of seconds sicne Jan 1st 1970.
    const response = await fetch(`/api/cups/timeframe/${startTime}/${endTime}`);
    const json = await response.json();
    return json && json.cups;
};

const GetBoxesPerTime = async (startTime, endTime) => {
    // Time should be given in number of seconds sicne Jan 1st 1970.
    const response = await fetch(`/api/boxes/timeframe/${startTime}/${endTime}`);
    const json = await response.json();
    return json && json.boxes;
};

// Retrieves the current cup type being inserted into the database.
const GetCurrentCupType = async () => {
    const response = await fetch(`api/cups/type`);
    const json = await response.json();
    document.getElementById("cups").value = json.type;
};

const GetMachineVersionInfo = async () => {
    const response = await fetch(`api/machine`);
    const json = await response.json();
    console.log(json);
    document.getElementById("versionCode").innerHTML = json.machine.id;
    document.getElementById("conveyorState").innerHTML = json.machine.conveyorstate ? "Running" : "Stopped";
    document.getElementById("lidState").innerHTML = json.machine.lidstate ? "Open" : "Closed";
    document.getElementById("calibrationState").innerHTML = json.machine.motorcalibrating ? "Calibrating" : "Not Calibrating";
    document.getElementById("sequenceState").innerHTML = json.machine.sequencing ? "Sequencing" : "Not Sequencing";
};

// Control Panel methods.
// Alters the cup type entering the database.
const PostNewCupType = async () => {
    const type = {
        type: document.getElementById("cups").value,
    };
    const response = await fetch(`/api/cups/type`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(type)
    });
};

// Gets the available cup types from the database.
const GetCupTypes = async () => {
    const element = document.getElementById("cups");
    const response = await fetch('/api/cups/types');
    (await response.json()).types.forEach(type => {
        const newOption = document.createElement('option');
        newOption.value = type.type;
        newOption.innerHTML = type.type;
        element.appendChild(newOption);
    });
    element.value = "No Type Selected";
};

const AlterCupsPerBox = async () => {
    const count = document.getElementById("alterCupsPerBox").value;
    const response = await fetch(`/api/boxcount/${count}`, {
        method: "POST",
    });
};

const ToggleLid = async () => {
    const response = await fetch(`/api/lid`, {
        method: "POST",
    });
};

const ToggleConveyor = async () => {
    const response = await fetch(`/api/conveyor`, {
        method: "POST",
    });
};

const ToggleCalibration = async () => {
    const response = await fetch(`/api/calibrate/true`, {
        method: "POST",
    });
};

const ToggleSequence = async () => {
    const response = await fetch(`/api/sequence/true`, {
        method: "POST",
    });
};

const AddCup = async () => {
    const response = await fetch(`/api/cup/add`, {
        method: "POST",
    });
};

const SendEmailReport = async () => {
    const response = await fetch(`/api/email`, {
        method: "POST",
    });
};


// All routine methods fit within here.
const CreateRoutineCheck = () => {
    GetTotalBoxes();
    GetTotalCups();
    GetCupTypes();
    GetCurrentCupType();
    GetCupsInCurrentBox();
    GetCupsPerBox();
    GetMachineVersionInfo();
    setInterval(() => {
        GetTotalBoxes();
        GetTotalCups();
        GetCupsInCurrentBox();
        GetCupsPerBox();
        GetMachineVersionInfo();
        // GetMachineVersionInfo();
        // GetCurrentCupType();
        // GetConveyorState();
        // GetLidState();
        // GetCalibrationState();
        // GetSequenceState();
    }, 2000);
};

CreateRoutineCheck();