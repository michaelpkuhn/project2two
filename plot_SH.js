d3.json("data/trip_count.json").then((data) => {

  console.log(data);

  // var date = data.Date;
  // console.log(date);

  // var count =data.Trip_Count;
  

  //  Create the Traces
  var trace1 = {
    x: data.map(row => row.Date),
    y: data.map(d => d.Trip_Count),
    // text: data.map(row => row.Date),
    fill: 'tozeroy',
    type: "scatter",
    name: "Total data Per Day"
  };
  

  // Create the data array for the plot
  var data = [trace1];
  console.log(data.Date);

  // Define the plot layout
  var layout = {
    title: "Total Trips Per Day",
    xaxis: { title: "Date" },
    yaxis: { title: "Total"}
  }

  // Plot the chart to a div tag with id "plot"
  Plotly.newPlot("plot", data, layout);
});