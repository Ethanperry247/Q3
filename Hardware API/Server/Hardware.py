import serial
import time
import threading
import csv

# The server will send these codes to the controller.
serverDictionary = {
    1: {
        "Name": "Begin",
        "Description": "Code sent to the controller when program should initialize.",
    },
    2: {
        "Name": "Add Cup to Count",
        "Description": "Code sent to the controller when a cup should be added to the count manually."
    },
    3: {
        "Name": "Alter Conveyor",
        "Description": "Code sent to the controller when the conveyor state should be altered."
    },
    5: {
        "Name": "Alter Lid",
        "Description": "Code sent to the controller when the lid state should be altered."
    },
    7: {
        "Name": "Calibrate Motor",
        "Description": "Code sent to the controller when it should calibrate the motor."
    },
    8: {
        "Name": "Alter Count",
        "Description": "Code sent to the controller when it should alter the count it puts in each box."
    },
}

# The controller will send these codes to the server.
controllerDictionary = {
    1: {
        "Name": "Ready",
        "Description": "Code sent from the controller when it is ready to run.",
        "Action": lambda model: model.setInterfaceLiveState()
    },
    2: {
        "Name": "Cup Detected",
        "Description": "Code sent from the controller when having detected a cup.",
        "Action": lambda model: model.postCup()
    },
    3: {
        "Name": "Box Filled",
        "Description": "Code sent from the controller when a box has been fully filled.",
    },
    4: {
        "Name": "Conveyor State Changed",
        "Description": "Code sent from the controller when the conveyor has changed state.",
        "Action": lambda model: model.setConveyorState()
    },
    6: {
        "Name": "Lid State Changed",
        "Description": "Code sent from the controller when the lid has changed state.",
        "Action": lambda model: model.setLidState()
    },
    8: {
        "Name": "Motor Calibrating",
        "Description": "Code sent from the controller when the motor should calibrate.",
        "Action": lambda model: model.setMotorCalibrationState()
    },
    9: {
        "Name": "New Box Ready",
        "Description": "Code sent from the controller when a new box is ready to load.",
        "Action": lambda model: model.postBox()
    }
}

class Interface:

    def __init__(self, port=None, baud=9600, model=None):
        super().__init__()
        self.model = model
        self.stop_listening = False

        if (port is not None and baud is not None):
            self.com = serial.Serial(port=port, baudrate=baud, bytesize=8)

    def listen(self) -> list:
        return list(self.com.read(self.com.inWaiting()))

    def send(self, message) -> None:
        # self.com.write(bytes(message))
        print(message)

    def startListening(self):
        def loopListen():
            while (not self.stop_listening):
                message = self.listen()
                if (message):
                    self.handleMessage(message)
        thread = threading.Thread(target=loopListen)
        thread.start()

    def handleMessage(self, message):
        print(message)
        if (len(message) == 1):
            if (controllerDictionary[message]["Action"] is not None):
                controllerDictionary[message]["Action"](self.model)
                print(controllerDictionary[message]["Description"])

    def stopListening(self):
        self.stop_listening = True
    
    def quitProgram(self):
        self.stopListening()
        self.stopCLI()
        self.com.close()