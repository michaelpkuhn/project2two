// Fetch the JSON data and console log it
d3.json("static/js/data/avg_hr_rides.json").then((data) => {
    //console.log(data);

    function dayTrips(data) {
    return data.Day_End === "Weekday";
    }
    var wd = data.filter(dayTrips);
    //console.log(wd);

    var we = data.filter(e => !dayTrips(e));
    //console.log(we);


    var trace1 = {
    x: wd.map(row => row.Time),
    y: wd.map(row => row.Avg_Per_Hour),
    // text: data.map(row => row.Day_End === "Weekday"),
    name: "Weekday",
    type: "scatter",
    line: {
    color: 'rgb(219, 64, 82)',
    width: 3
    }
    };

    // Trace 2 for the Roman Data
    var trace2 = {
    x: we.map(row => row.Time),
    y: we.map(row => row.Avg_Per_Hour),
    // text: data.map(row => row.Day_End === "Weekend"),
    name: "Weekend",
    type: "scatter",
    line: {
    color: 'rgb(55, 128, 191)',
    width: 3}
    };
    
    var data = [trace1,trace2];

    // Define the plot layout
    var layout = {
    title: {
        text:'Average Rides Per Hour',
        font: {
        family: "Lucida Console, monospace",
        size: 24,
        color: 'rgb(203,24,29)'      
    }
    },
    yaxis: { title: "TOTAL RIDES" },
    width: 700,
    height: 300
    };

    // Plot the chart to a div tag with id "plot"
    Plotly.newPlot("hour", data, layout);
});