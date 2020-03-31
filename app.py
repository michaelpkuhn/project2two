import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlalchemy import create_engine, inspect

from flask import Flask, jsonify, render_template, redirect


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

@app.route("/api/divvy")
def divvy():
    #Scoot JSON
    divvy_results = engine.execute("Select * from randomDivvy LIMIT 10000").fetchall()
    inspector = inspect(engine)
    divvyColumns = inspector.get_columns('randomDivvy')
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
    return render_template('/maps.html')#, data=mars_data, hemi=mars_data['hemi'], news = mars_data['news'])



if __name__ == '__main__':
    app.run(debug=True)