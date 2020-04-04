import os
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlalchemy import create_engine, inspect
import requests
from flask import Flask, jsonify, render_template, redirect
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
db_url = F"postgres://postgres:{pw}@localhost/chiScoot"
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', db_url)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


# Connects to the database using the app config
db = SQLAlchemy(app)


#engine = create_engine("sqlite:///project2_heroku/data/chiTransport2.sqlite")
engine = create_engine(db_url)

@app.route("/")
def welcome():
    scoot = '/api/scoot'
    divvy = '/api/divvy'
    getMap = '/map'
    return (
        f"Available Routes:<br/>"
        f"<a href={scoot}>{scoot}</a><br/>"
        f"<a href={divvy}>{divvy}</a><br/>"
        f"<a href={getMap}>{getMap}</a>"
    )
    

@app.route("/api/scoot")
def scoot():
    def returnJson():
        url = "https://data.cityofchicago.org/resource/2kfw-zvte.json"
        r = requests.get(url)
        data = r.json()
        return jsonify(data)
    
    try:
        #Scoot JSON
        #scootResults = engine.execute("Select * from randomScoot WHERE [Start Census Tract] != '' AND [End Community Area Number] != '' AND [Trip Distance] != '0' LIMIT 10000").fetchall()
        #scootResults = engine.execute("Select * from DNE")
        scootResults = engine.execute("Select * from scoot LIMIT 1001").fetchall()
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
    except TypeError:
        return returnJson()
    except Exception as e:
        print(e)
        return returnJson()

@app.route("/api/divvy")
def divvy():
    #Scoot JSON
    #divvy_results = engine.execute("Select * from randomDivvy LIMIT 10000").fetchall()
    divvy_results = engine.execute("Select * from divvy LIMIT 1000").fetchall()
    inspector = inspect(engine)
    #divvyColumns = inspector.get_columns('randomDivvy')
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

@app.route("/map")
def getMap():
    return render_template('maps.html')#, data=mars_data, hemi=mars_data['hemi'], news = mars_data['news'])



if __name__ == '__main__':
    app.run(debug=True)