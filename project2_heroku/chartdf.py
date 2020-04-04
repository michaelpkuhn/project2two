import pandas as pd
import datetime as dt
import time
import numpy as np

def scooterJson():
    scooter = pd.read_json('/api/scoot')
    scooter.columns = scooter.columns.str.replace(' ', '_')
    scooter = scooter.sort_values(by='Distance', ascending=False)
    scooter['Distance']= (scooter.Distance/1609).round(decimals=2)
    scooter = scooter[(scooter['Distance'] <30)]
    scooter = scooter[(scooter['Distance'] >0)]
    scooter['Date']= scooter['Start_Time'].str[:10]
    scooter['Time']= scooter['Start_Time'].str[-8:]
    x = scooter['Date'].str[:5]
    y = scooter['Date'].str[-4:]
    m = x.str[:2]
    d = x.str[-2:]
    scooter["Date"] = y + '-' + m + '-' + d
    scooter['Start_Time']=pd.to_datetime(scooter.Start_Time)
    scooter['Weekday']=scooter.Start_Time.dt.weekday_name
    weekdays = ["Monday","Tuesday","Wednesday", "Thursday", "Friday"]
    weekday_ls = []
    for day in scooter["Weekday"]:
        if day in weekdays:
            weekday_ls.append("Weekday")
        else:
            weekday_ls.append("Weekend")        
    scooter["Day_End"] = weekday_ls
    # scooter

    scooter['Trip_Count']= 1
    scooter = scooter[scooter.Date != '2019-10-01']
    scooter = scooter[scooter.Date != '2019-10-13']
    scooter = scooter[scooter.Date != '2019-10-15']
    scooter = scooter[scooter.Date != '2019-10-16']
    return scooter



def ridesDay(scooter):
    daily_rides= scooter.groupby(['Date'])['Trip_Count'].sum().reset_index()
    comm_daily_rides= scooter.groupby(['Date','start_name'])['Trip_Count'].sum().reset_index()
    total_rides= comm_daily_rides.merge(daily_rides, on= ['Date'],how= 'left')
    return total_rides

def avgWeek(scooter):
    hour_rides = scooter.groupby(['Day_End','Time'])['Trip_Count'].sum().reset_index()
    new_row = {'Time': '04:00 AM', 'Day_End':'Weekday', 'Trip_Count': 0}
    hour_rides = hour_rides.append(new_row, ignore_index=True)
    hour_rides = hour_rides.iloc[pd.to_datetime(hour_rides.Time).values.argsort()]
    # Add column with Weekday and weekend count
    hour_rides['Day_Count'] = [76 if ele == 'Weekday' else 32 for ele in hour_rides['Day_End']]

    # Calculate average rides per hour on Weekdays and Weekend
    hour_rides['Avg_Per_Hour'] = (hour_rides['Trip_Count']/hour_rides['Day_Count']).round()
    return hour_rides

def tripDistance(scooter):
    # Trip Count per Community
    comm_trips = scooter.groupby(['Start_Community_Area_Name'])['Trip_Count'].sum().reset_index()
    # comm_trips

    # comm_trips = scooter.groupby(['Trip_Count'])['Trip_Count'].sum().reset_index()

    # Sort Trip Count in Descending order
    comm_trips =comm_trips.sort_values(by='Trip_Count', ascending=False)
    bottom= ['BELMONT CRAGIN','AUSTIN', 'AVONDALE', 'HUMBOLDT PARK','LOWER WEST SIDE', 'HERMOSA','NORTH LAWNDALE','IRVING PARK', 'SOUTH LAWNDALE','EAST GARFIELD PARK','PORTAGE PARK', 'WEST GARFIELD PARK', 'MONTCLARE','DUNNING', 'NEAR NORTH SIDE', 'LINCOLN PARK','BRIDGEPORT','NORTH CENTER', 'LOOP', 'WOODLAWN', 'NEW CITY', 'NEAR SOUTH SIDE', 'UPTOWN', 'GAGE PARK', 'BRIGHTON PARK', 'ARMOUR SQUARE']
    comm_trips = scooter.filter(items=['Start_Community_Area_Name','Distance','Trip_Count'])
    omm_trips = comm_trips.dropna()
    def f(row):
        if row['Distance'] >5:
            val = ">5 miles"
        elif row['Distance'] >= 4:
            val = "4-5 miles"
        elif row['Distance'] >= 3:
            val = "3-4 miles"
        elif row['Distance'] >= 2:
            val = "2-3 miles"
        elif row['Distance'] >= 1:
            val = "1-2 miles"
        else:
            val =  "<1 mile"

        return val
    comm_trips["Distance_Range"] = comm_trips.apply(f,axis=1)
    top_comm = comm_trips[~scooter['Start_Community_Area_Name'].isin(bottom)]
    comm_dist = top_comm.groupby(['Start_Community_Area_Name','Distance_Range'])['Trip_Count'].sum().reset_index()
    dist = comm_dist.groupby(['Distance_Range'])['Trip_Count'].sum().reset_index()
    dist

    total_rides = 453980

    dist['Percentage'] = ((dist['Trip_Count']/total_rides)*100).round()
    dist

    dist = dist.sort_values(by='Trip_Count', ascending=False)
    # dist

    dist['Percentage'] = dist['Percentage'].astype(str) + '%'
    # Define a function to map the grand total trip values for top 3 communities 
    def set_value(row_number, assigned_value): 
        return assigned_value[row_number] 
    
    # Create the dictionary 
    event_dictionary ={'LOGAN SQUARE' : 87764, 'WEST TOWN' : 179349, 'NEAR WEST SIDE' : 186867} 
    
    # Add a new column named 'Total Rides' 
    comm_dist['Total_Rides'] = comm_dist['Start_Community_Area_Name'].apply(set_value, args =(event_dictionary, )) 
    comm_dist['Trip_Pct'] = ((comm_dist['Trip_Count']/comm_dist['Total_Rides'])*100).round()
    return comm_dist