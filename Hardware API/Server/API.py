import Hardware
import Model
import Netops
from flask import Flask
app = Flask(__name__)
model = Model.Model(Hardware.Interface, Netops)

@app.route('/setCount/:count')
def setCupCount():
    return ''

@app.route('/addCup')
def incrementTotalCupCount():
    return ''

@app.route('/alterConveyorState')
def alterConveyorState():
    pass

@app.route('/alterLidState')
def alterLidState():
    pass
@app.route('/calibrate')
def calibrate():
    pass