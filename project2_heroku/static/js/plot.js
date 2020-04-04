d3.json("data/ride_count.json").then((data) => {

    console.log(data);

  // var date = data.Date;
  // console.log(date);

  // var count =data.Trip_Count;
  // Create variable for Near West Side
    function nwside(data){
    return data.Start_Community_Area_Name === "NEAR WEST SIDE";
    }

    var nw = data.filter(nwside);
    console.log(nw);

    // Create variable for West Town
    function wtown(data){
      return data.Start_Community_Area_Name === "WEST TOWN";
    }

    var wt= data.filter(wtown);
    console.log(wt);

    // Create variable for Logan Square
    function lSquare(data){
      return data.Start_Community_Area_Name === "LOGAN SQUARE";
    }

    var ls= data.filter(lSquare);
    console.log(ls);

    // // Create variable for Belmont Cragin
    // function bCragin(data){
    //   return data.Start_Community_Area_Name === "BELMONT CRAGIN";
    // }

    // var bc= data.filter(bCragin);
    // console.log(bc);

    // // Create variable for Belmont Cragin
    // function austin(data){
    //   return data.Start_Community_Area_Name === "AUSTIN";
    // }

    // var as= data.filter(austin);
    // console.log(as);

    // Create the Traces
    var trace1 = {
        x: data.map(row => row.Date),
        y: data.map(d => d.Trip_Count_y),
        // text: data.map(row => row.Date),
        fill: 'tozeroy',
        type: "scatter",
        name: "Chicago"
    };

    var trace2 = {
        x: nw.map(row => row.Date),
        y: nw.map(d => d.Trip_Count_x),
        // text: data.map(row => row.Date),
        type: "scatter",
        name: "Near West Town"
    };

    var trace3 = {
        x: wt.map(row => row.Date),
        y: wt.map(d => d.Trip_Count_x),
        // text: data.map(row => row.Date),
        type: "scatter",
        name: "West Town"
    };

    var trace4 = {
        x: ls.map(row => row.Date),
        y: ls.map(d => d.Trip_Count_x),
        // text: data.map(row => row.Date),
        type: "scatter",
        name: "Logan Square"
    };

    // var trace5 = {
    //     x: bc.map(row => row.Date),
    //     y: bc.map(d => d.Trip_Count_x),
    //     // text: data.map(row => row.Date),
    //     type: "scatter",
    //     name: "Belmont Cragin"
    // };

    // var trace6 = {
    //     x: as.map(row => row.Date),
    //     y: as.map(d => d.Trip_Count_x),
    //     // text: data.map(row => row.Date),
    //     type: "scatter",
    //     name: "Austin"
    // };

    //   Create the data array for the plot
    var data = [trace1, trace2,trace3,trace4];

    // Define the plot layout
    var layout = {
    title: {
    text:'Total Trips Per Day',
    font: {
      family: "Lucida Console, monospace",
      size: 24,
      color: 'rgb(203,24,29)'
    },
    xref: 'paper',
    x: 0.05,
    },
    yaxis: { title: "TOTAL RIDES"},
    margin: {
    l: 75,
    r: 50,
    b: 50,
    t: 50,
    pad: 4
    },
    width: 750,
    height: 500   
    }

  // Plot the chart to a div tag with id "plot"
  Plotly.newPlot("rides", data, layout);

});




  

//   console.log(data.Date);

  


// / Initializes the page with a default plot
//     function init() {
//     data = [{
//         x: data.map(row => row.Date),
//         y: data.map(d => d.Trip_Count_y)}];

//     var CHART = d3.selectAll("#plot").node();

//     Plotly.newPlot(CHART, data);
//     }

//     // Call updatePlotly() when a change takes place to the DOM
//     d3.selectAll("body").on("change", updatePlotly);

//     // This function is called when a dropdown menu item is selected
//     function updatePlotly() {
//     // Use D3 to select the dropdown menu
//     var dropdownMenu = d3.select("#selDataset");
//     // Assign the value of the dropdown menu option to a variable
//     var dataset = dropdownMenu.node().value;

//     var CHART = d3.selectAll("#rides").node();

//     // Initialize x and y arrays
//     var x = [];
//     var y = [];

//     // Initialize x and y arrays
//     var x = [];
//     var y = [];

//     switch(dataset) {
//     case "dataset1":
//         x = nw.map(row=> row.Date);
//         y = nw.map(row => row.Trip_Count_x);
//         break;

//     case "dataset2":
//         x = wt.map(row=> row.Date);
//         y = wt.map(row => row.Trip_Count_x);
//         break;

//     case "dataset3":
//         x = ls.map(row=> row.Date);
//         y = ls.map(row => row.Trip_Count_x);
//         break;

//     case "dataset4":
//         x = bc.map(row=> row.Date);
//         y = bc.map(row => row.Trip_Count_x);
//         break;

//     case "dataset5":
//         x = as.map(row=> row.Date);
//         y = as.map(row => row.Trip_Count_x);
//         break;

//     default:
//         x = data.map(row => row.Date);
//         y = data.map(d => d.Trip_Count_y);
//       break;
//   }
//     // Note the extra brackets around 'x' and 'y'
//     Plotly.restyle(CHART, "x", [x]);
//     Plotly.restyle(CHART, "y", [y]);
//     }

//     init();