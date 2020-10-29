import serial
import time
import threading
import csv

serverDictionary = {
    1: {
        "Name": "Begin",
        "Description": "Code sent to the controller when program should initialize."
    },
    2: {
        "Name": "Add Cup to Count",
        "Description": "Code sent to the controller when a cup should be added to the count manually."
    },
    3: {
        "Name": "Run Conveyor",
        "Description": "Code sent to the controller when the conveyor should begin running."
    },
    4: {
        "Name": "Stop Conveyor",
        "Description": "Code sent to the controller when the conveyor should stop."
    },
    5: {
        "Name": "Open Lid",
        "Description": "Code sent to the controller when the lid should open."
    },
    6: {
        "Name": "Close Lid",
        "Description": "Code sent to the controller when the lid should close."
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

controllerDictionary = {
    1: {
        "Name": "Ready",
        "Description": "Code sent from the controller when it is ready to run."
    },
    2: {
        "Name": "Cup Detected",
        "Description": "Code sent from the controller when having detected a cup."
    },
    3: {
        "Name": "Box Filled",
        "Description": "Code sent from the controller when a box has been fully filled."
    },
    4: {
        "Name": "Conveyor Running",
        "Description": "Code sent from the controller when the conveyor has started running."
    },
    5: {
        "Name": "Conveyor Stopped",
        "Description": "Code sent from the controller when the conveyor has stopped."
    },
    6: {
        "Name": "Lid Opened",
        "Description": "Code sent from the controller when the lid has opened."
    },
    7: {
        "Name": "Lid Closed",
        "Description": "Code sent from the controller when the lid has closed."
    },
    8: {
        "Name": "Motor Calibrating",
        "Description": "Code sent from the controller when the motor should calibrate."
    },
}

class Interface:

    listener_paused = False

    def __init__(self, port=None, baud=9600):
        super().__init__()
        if (port is not None and baud is not None):
            self.com = serial.Serial(port=port, baudrate=baud, bytesize=8)

    def listen(self) -> list:
        return list(self.com.read(self.com.inWaiting()))

    def printCode(self, code: int) -> None:
        print(code)

    def send(self, message) -> None:
        self.com.write(bytes(message))

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

    def stopListening(self):
        self.stop_listening = True
    
    def quitProgram(self):
        self.stopListening()
        self.stopCLI()
        self.com.close()

# interface = Interface("COM5", 9600)
# interface.startListening()
# interface.startDebugging()
# interface.startCLI()