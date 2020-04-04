import os
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlalchemy import create_engine, inspect
import requests
from flask import Flask, jsonify, render_template, redirect, make_response, json
import sys
import sqlalchemy.dialects.postgresql
#from config import pw
from flask_sqlalchemy import SQLAlchemy
import base64

#################################################
# Database Setup
#################################################
#engine = create_engine("sqlite:///../data/chiTransport2.sqlite")

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

pw = base64.b64decode(b'a2VubndvcnQ=').decode("utf-8")
#environment variable to connect to the Heroku database.
# DATABASE_URL will contain the database connection string:
uri = 'postgres://pcflsmnymjbcye:bdbcd5493c7cf452038b086302d1638fe966f702d6cf8ac5ac5a0d67d4053a50@ec2-18-206-84-251.compute-1.amazonaws.com:5432/d6ktnq49kslfr0?sslmode=require'
db_url = F"postgres://postgres:{pw}@localhost/chiScoot"
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', uri)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Connects to the database using the app config
db = SQLAlchemy(app)


#engine = create_engine("sqlite:///project2_heroku/data/chiTransport2.sqlite")
try:
    engine = create_engine(db_url)
except:
    engine = create_engine(db)


@app.route("/api/scoot")
def scoot():
    def createScoot(scootResults):
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
        return scootJson
    scootResults = engine.execute("Select * from scoot LIMIT 100000").fetchall()
    scootJson = createScoot(scootResults)
    return jsonify(scootJson)

@app.route("/api/divvy")
def divvy():
    divvy_results = engine.execute("Select * from divvy LIMIT 10000").fetchall()
    inspector = inspect(engine)
    divvyColumns = inspector.get_columns('divvy')
    colNames = [d['name'] for d in divvyColumns]
    q2scope = ['2019-04','2019-05']
    divvyJson = []
    for result in divvy_results:
        if result[1][:7] not in q2scope:
            r = {}
            for i, c in enumerate(colNames):
                if i != 3 and i != 6 and i < 8:
                     r[c] = result[i]
            divvyJson.append(r)
    
    return jsonify(divvyJson)


@app.route("/")
def welcome():
    return render_template('index2.html')

@app.route("/dos_donts")
def dos_donts():
    return render_template("Dos_Donts.html")

@app.route("/map")
def getMap():
    return render_template('maps.html')
    
@app.route("/map2")
def getMap2():
    return render_template('maps2.html')
    
@app.route("/sitemap")
def sitemap():
    home = '/'
    scoot = '/api/scoot'
    divvy = '/api/divvy'
    getMap = '/map'
    getMap2 = '/map2'
    dd = '/dos_donts'
    return (
        f"Available Routes:<br/>"
        f"<a href={home}>Home</a><br/>"
        f"<a href={scoot}>{scoot}</a><br/>"
        f"<a href={divvy}>{divvy}</a><br/>"
        f"<a href={getMap}>{getMap}</a><br/>"
        f"<a href={getMap2}>{getMap2}</a><br/>"
        f"<a href={dd}>{dd}</a>"
    )

if __name__ == '__main__':
    app.run(debug=True)