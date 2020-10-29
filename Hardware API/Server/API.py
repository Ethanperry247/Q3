from flask import Flask
app = Flask(__name__)

@app.route('/setCupCount/:count')
def setCupCount():
    return ''

@app.route('/addCup')
def incrementTotalCupCount():
    return ''

@app.route('/incrementTotalCupCount')
def incrementTotalCupCount():
    return ''