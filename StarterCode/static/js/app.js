// Creating a function for Bar plot 
function optionChanged(id) {
    d3.json("static/data/samples.json").then((importedData) => {
        sampleData=importedData.samples.filter(d=>d.id == id)[0];
        buildPlot(sampleData);
        console.log(sampleData);
    });
}


function buildPlot(sampleData){
        // Slice the first 10 objects for plotting. Lecture 15.2 Ex6. Getting only top 10 OTU ID for the plot
        var ids = sampleData.otu_ids;
        var labels = sampleData.otu_labels;
        var sample_values1 =  sampleData.sample_values;


        // get the top 10 labels for the plot
        // var labels = importedData.otu_labels.slice(0, 10);

        // Trace1 for the Greek Data Bar Chart
        var trace1 = {
            x: sample_values1.slice(0,10).reverse(),  // get the otu id's to the desired form for the plot
            y: ids.slice(0,10).reverse().map(d=>`OUT ${d}`),
            text: labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        };
        
        // data
        var data = [trace1];
        
        // Apply the group bar mode to the layout
        var layout = {
            title: "Top 10 OTUs results",
    
        };
        
        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bar", data, layout);
        

        ////// Bubble Chart

        var trace2 = {
            x: sample_values1,  // get the otu id's to the desired form for the plot
            y: ids,
            text: labels,
            mode: "markers",
            marker: {
                size: sample_values1,
                color: ids,

            }
            
        };
        
        // data
        var data = [trace2];
        
        // Apply the group bar mode to the layout
        var layout = {
            title: "Top 10 OTUs results",
    
        };
        
        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bubble", data, layout);


}
/// Use D3 fetch to read the JSON file
/// The data from the JSON file is arbitrarily named importedData as the argument
    d3.json("static/data/samples.json").then((importedData) => {
        console.log(importedData);

        //////creating a variable called name and extract it

        var optionSelect = d3.select("#selDataset");
        var sampleNames = importedData.names;
        sampleNames.forEach(element => { 
            optionSelect.append("option").text(element).property("value", element); 
        });

        var sampleData = importedData.samples[0];
        console.log(sampleData);

        buildPlot(sampleData);

        var wfreq = importedData.metadata.map(d => d.wfreq);
        console.log(`Washing Freq: ${wfreq}`);

        var sampleValues = importedData.samples.map(x=>x.sample_values);
        // console.log(sampleValues);
    


        
    });
// }


    // Call updatePlotly() when a change takes place to the DOM/// 
   


    //////////
