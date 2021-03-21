function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  //console.log(sample)
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
   var samples = data.samples;
   console.log(samples);
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var samplesNumber = samples.filter(sampleobj => sampleobj.id ==sample);
    var metadataarray= data.metadata.filter(obj=>obj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var firstSample = samplesNumber[0];
    console.log(firstSample)
    var metadata = metadataarray[0];
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var values = firstSample.sample_values;
    var labels = firstSample.otu_labels;
    var ids = firstSample.otu_ids;

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
   var yticks = ids.slice(0, 10).map(otu_id => `otu_id ${otu_id}`).reverse();

    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: values.slice(0,10).reverse(),
      y: yticks,
      text: labels.slice(0,10).reverse(),
      type:"bar",
      orientation: "h"
    }];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found"
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout)

    var bubbleData = [{
      x: ids,
      y: values,
      mode: "markers",
      hovermode: "closest",
    marker:{ 
          color: ids,
          size: values,

      },
  }];
  var bubbleLayout = {
    title: "Bacteria Culture Per Sample",
    xaxis: {title : "OTU ID"},
    hovermode:`closest`  
  };
  Plotly.newPlot("bubble", bubbleData, bubbleLayout);
 // })
//}
  var wfreq = parseFloat(metadata.wfreq);
// D2: 3. Use Plotly to plot the data with the layout.
var trace3 = {
  value: wfreq,
    title:{text: "<b class='h4'>Belly Button Washing Frequency</b><br>Scrubs Per Week"},
    type: "indicator",
    mode: "gauge+number",
    gauge: {
    axis: {range: [null,10], tickwidth: 1, tickcolour: "black"},
    bgcolor: "white",
    borderwidth: 2,
    bordercolor: "gray",
    bar: {color: "black"},
    steps: [
    {range: [0, 2], color: "red"},
    {range: [2, 4], color: "orange"},
    {range: [4, 6], color: "yellow"},
    {range: [6, 8], color: "lightgreen"},
    {range: [8, 10], color: "green"},
    ]  
}     
};

var gaugeData = [trace3]

var gaugeLayout = {
  width: 500,
  height:400,
  margin: {t:0, b:0},
  font: {color: "black", family: "Arial"}
}
Plotly.newPlot("gauge", gaugeData, gaugeLayout);


// Use Plotly to plot the data with the layout. 

    // 1. Create the trace for the bubble chart.


    // 2. Create the layout for the bubble chart.
    

    // 3. Use Plotly to plot the data with the layout.
    
  }
  )}