class Model:

    ''' Model definition. '''
    def __init__(self, interface, netops):
        self.cupType = "None"
        self.isInterfaceLive = False
        self.lidState = "Open"
        self.conveyorState = "Stopped"
        self.isMotorCalibrating = False
        self.boxSize = 24
        self.boxId = None
        self.netops = netops
        self.interface = interface(model=self)
        # interface.startListening()
        # interface.send([1])

    ''' Model use cases. '''
    def getLidState(self):
        return lidState

    def getConveyorState(self):
        return conveyorState

    def getIsMotorCalibrating(self):
        return isMotorCalibrating
        
    def getCupsPerBox(self):
        return boxSize

    def setConveyorState(self):
        pass

    def setLidState(self):
        pass

    def setMotorCalibrationState(self):
        pass 

    def alterLidState(self):
        self.interface.send([3])

    def alterConveyorState(self):
        self.interface.send([5])

    def alterMotorCalibrationState(self):
        self.interface.send([7])

    def setCupsPerBox(self, cups):
        self.interface.send([8, cups])

    def postBox(self):
        self.boxId = self.netops.postBox(self.boxSize)

    def postCup(self):
        self.netops.postCup(self.cupType, self.boxId)

    def manuallyAddCup(self):
        self.interface.send([2])

    def setInterfaceLiveState(self):
        self.isInterfaceLive = True