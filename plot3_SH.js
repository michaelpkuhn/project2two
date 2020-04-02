d3.json("data/comm_dist.json").then((data) => {

  console.log(data);

  // Create variable for Distances greater than 5miles
  function greater(data){
    return data.Distance_Range === ">5 miles";
  }

  var greaterThan = data.filter(greater);
  console.log(greaterThan);

  // Create variable for Distances greater than 5miles
  function fourFive(data){
    return data.Distance_Range === "4-5 miles";
  }

  var between45 = data.filter(fourFive);
  console.log(between45);

  // Create variable for Distances greater than 5miles
  function threeFour(data){
    return data.Distance_Range === "3-4 miles";
  }

  var between34 = data.filter(threeFour);
  console.log(between34);

  // Create variable for Distances greater than 5miles
  function twoThree(data){
    return data.Distance_Range === "2-3 miles";
  }

  var between23 = data.filter(twoThree);
  console.log(between23);

  // Create variable for Distances greater than 5miles
  function oneTwo(data){
    return data.Distance_Range === "1-2 miles";
  }

  var between12 = data.filter(oneTwo);
  console.log(between12);

  // Create variable for Distances greater than 5miles
  function less(data){
    return data.Distance_Range === "<1 mile";
  }

  var lessThan = data.filter(less);
  console.log(lessThan);

  // Create trace for >5 Miles
  var trace1 = {
  x: greaterThan.map(row => row.Trip_Count),
  y: greaterThan.map(row => row.Start_Community_Name),
  name: ">5 Miles",
  type: "bar",
  orientation: 'h'
  };

  // Create trace for 4-5 Miles
  var trace2 = {
  x: between45.map(row => row.Trip_Count),
  y: between45.map(row => row.Start_Community_Name),
  name: "4-5 Miles",
  type: "bar",
  orientation: 'h'
  };

  // Create trace for 3-4 Miles
  var trace3 = {
  x: between34.map(row => row.Trip_Count),
  y: between34.map(row => row.Start_Community_Name),
  name: "3-4 Miles",
  type: "bar",
  orientation: 'h'
  };

  // Create trace for 2-3 Miles
  var trace4 = {
  x: between23.map(row => row.Trip_Count),
  y: between23.map(row => row.Start_Community_Name),
  name: "2-3 Miles",
  type: "bar",
  orientation: 'h'
  };

  // Create trace for 1-2 miles
  var trace5 = {
  x: between12.map(row => row.Trip_Count),
  y: between12.map(row => row.Start_Community_Name),
  name: "1-2 Miles",
  type: "bar",
  orientation: 'h'
  };

  // Create trace for <1 miles
  var trace6 = {
  x: lessThan.map(row => row.Trip_Count),
  y: lessThan.map(row => row.Start_Community_Name),
  name: "<1 Mile",
  type: "bar",
  orientation: 'h'
  };


  var data = [trace1,trace2,trace3,trace4,trace5,trace6];

  var layout = {
  barmode: 'stack',
  title: "Top Community Distance Range",
  xaxis: { title: "Percentage of Rides" },
  // yaxis: { title: "Community" },
  };

  Plotly.newPlot('stacked', data, layout);
});
