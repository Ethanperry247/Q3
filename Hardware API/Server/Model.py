class Model:

    ''' Model definition. '''
    def __init__(self):
        self.lidState = "Open"
        self.conveyorState = "Stopped"
        self.isMotorCalibrating = False
        self.totalCupsProduced = 0
        self.cupsPerBox = 0
        self.cupsInCurrentBox = 0
        self.totalBoxesProduced = 0

    ''' Model use cases. '''
    def getLidState(self):
        return lidState

    def getConveyorState(self):
        return conveyorState

    def getIsMotorCalibrating(self):
        return isMotorCalibrating

    def getTotalCupsProduced(self):
        return totalCupsProduced
        
    def getCupsPerBox(self):
        return cupsPerBox

    def getCupsInCurrentBox(self):
        return cupsInCurrentBox

    def getTotalBoxesProduced(self):
        return totalBoxesProduced

    def alterLidState(self):
        pass

    def alterConveyorState(self):
        pass

    def alterMotorCalibrationState(self):
        pass

    def incrementTotalCupsProduced(self):
        pass

    def setCupsPerBox(self, cups):
        pass

    def incrementCupsInCurrentBox(self):
        pass

    def incrementTotalBoxesProduced(self):
        pass