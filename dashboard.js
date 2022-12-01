var dlink =
  "https://raw.githubusercontent.com/yuwei97910/is445-group30-final-project/main/DataSet/yelp_academic_dataset_business_IL.json";
$("#map").usmap({
  // The click action
  click: function (event, data) {
    $("#clicked-state").text("You have selected this state: " + data.name);
    dlink = `https://raw.githubusercontent.com/yuwei97910/is445-group30-final-project/main/DataSet/yelp_academic_dataset_business_${data.name}.json`;
    console.log(data.name);
    console.log(dlink);
    finalViz = {
      $schema: "https://vega.github.io/schema/vega-lite/v5.json",
      data: { url: dlink },
      mark: "bar",
      height: 300,
      width: 1000,
      background: null,
      encoding: {
        x: { field: "stars", type: "ordinal" },
        y: { aggregate: "count", field: "stars", type: "quantitative" },
        color: { value: "orange" },
      },
    };
    vegaEmbed("#vis", finalViz);
  },
});
finalViz = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: { url: dlink },
  mark: "bar",
  height: 300,
  width: 1000,
  background: null,
  encoding: {
    x: { field: "stars", type: "ordinal" },
    y: { aggregate: "count", field: "stars", type: "quantitative" },
    color: { value: "orange" },
  },
};
vegaEmbed("#vis", finalViz);
