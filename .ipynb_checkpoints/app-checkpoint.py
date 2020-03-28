import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///../data/chiTransport2.sqlite")

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


@app.route("/")
def welcome():
    #Scoot JSON
    scootResults = engine.execute("Select * from randomScoot WHERE [Start Census Tract] != '' AND [End Community Area Number] != '' AND [Trip Distance] != '0' LIMIT 10000").fetchall()
    scootJson = []
    #Start and End Time rounded to the nearest hour
    for result in scootResults:
        r = {}
        r['Trip ID'] = result[0]
        r['Start Time'] = result[1]
        r['Distance'] = result[3]
        r['Duration'] = result[4]
        r['Start Tract'] = result[6]
        r['End Tract'] = result[7]
        r['Start Community #'] = result[8]
        r['End Community #'] = result[9]
        r['Start Community Name'] = result[10]
        r['End Community Name'] = result[11]
        r['Start Lat'] = float(result[12])
        r['Start Long'] = float(result[13])
        r['End Lat'] = float(result[15])
        r['End Long'] = float(result[16])
        scootJson.append(r)
    
    return jsonify(scootJson)