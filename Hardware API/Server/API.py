import Hardware
import Model
import Netops
from flask import Flask
app = Flask(__name__)
model = Model.Model(Hardware.Interface, Netops)

@app.route('/setCount/:count')
def setCupCount(count):
    model.setCupsPerBox(count)
    return ''

@app.route('/addCup')
def incrementTotalCupCount():
    model.manuallyAddCup()
    return ''

@app.route('/alterConveyorState')
def alterConveyorState():
    model.alterConveyorState()
    return ''

@app.route('/alterLidState')
def alterLidState():
    model.alterLidState()
    return ''

@app.route('/calibrate')
def calibrate():
    model.alterMotorCalibrationState()
    return ''