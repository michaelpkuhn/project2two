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
  y: greaterThan.map(row => row.Start_Community_Area_Name),
  name: ">5 Miles",
  marker:{
    color: ['rgb(178,24,43)','rgb(178,24,43)','rgb(178,24,43)']
  },
  type: "bar",
  orientation: 'h'
  };

  // Create trace for 4-5 Miles
  var trace2 = {
  x: between45.map(row => row.Trip_Count),
  y: between45.map(row => row.Start_Community_Area_Name),
  name: "4-5 Miles",
  marker:{
    color: ['rgb(209,229,240)','rgb(209,229,240)','rgb(209,229,240)']
  },
  type: "bar",
  orientation: 'h'
  };

  // Create trace for 3-4 Miles
  var trace3 = {
  x: between34.map(row => row.Trip_Count),
  y: between34.map(row => row.Start_Community_Area_Name),
  name: "3-4 Miles",
 

  type: "bar",
  orientation: 'h'
  };

  // Create trace for 2-3 Miles
  var trace4 = {
  x: between23.map(row => row.Trip_Count),
  y: between23.map(row => row.Start_Community_Area_Name),
  name: "2-3 Miles",
  marker:{
    color: ['rgb(67,147,195)','rgb(67,147,195)','rgb(67,147,195)']
  },
  type: "bar",
  orientation: 'h'
  };

  // Create trace for 1-2 miles
  var trace5 = {
  x: between12.map(row => row.Trip_Count),
  y: between12.map(row => row.Start_Community_Area_Name),
  name: "1-2 Miles",
  marker:{
    color: ['rgb(33,102,172)','rgb(33,102,172)','rgb(33,102,172)']
  },
  type: "bar",
  orientation: 'h'
  };

  // Create trace for <1 miles
  var trace6 = {
  x: lessThan.map(row => row.Trip_Count),
  y: lessThan.map(row => row.Start_Community_Area_Name),
  name: "<1 Mile",
  marker:{
    color: ['rgb(5,48,97)','rgb(5,48,97)','rgb(5,48,97)']
  },
  type: "bar",
  orientation: 'h'
  };


  var data = [trace1,trace2,trace3,trace4,trace5,trace6];

  var layout = {
  barmode: 'stack',
  title: {
    text:'Top Community Distance Range',
    font: {
    family: "Lucida Console, monospace",
    size: 24,
    color: 'rgb(203,24,29)'      
    }
  },
  xaxis: { title: "TOTAL RIDES" },
  margin: {
    l: 75,
    r: 50,
    b: 50,
    t: 50,
    pad: 4
    },
  width: 750,
  yaxis: { automargin: true },
  };

  Plotly.newPlot('stacked', data, layout);
});

// var layout = {
//   title: {
//     text:'Plot Title',
//     font: {
//       family: 'Courier New, monospace',
//       size: 24
//     },
//     xref: 'paper',
//     x: 0.05,
//   },
//   xaxis: {
//     title: {
//       text: 'x Axis',
//       font: {
//         family: 'Courier New, monospace',
//         size: 18,
//         color: '#7f7f7f'
//       }
//     },
//   },
//   yaxis: {
//     title: {
//       text: 'y Axis',
//       font: {
//         family: 'Courier New, monospace',
//         size: 18,
//         color: '#7f7f7f'
//       }
//     }
//   }