$("#map").usmap({
  // The click action
  click: function (event, data) {
    $("#clicked-state").text("You have selected this state: " + data.name);
    dlink = `https://raw.githubusercontent.com/yuwei97910/is445-group30-final-project/main/DataSet/yelp_academic_dataset_business_${data.name}.csv`;
    state_link = `https://raw.githubusercontent.com/unitedstates/districts/gh-pages/states/${data.name}/shape.geojson`;
    console.log(data.name);
    console.log(dlink);
    var state_with_data = [
      "AB",
      "AZ",
      "CA",
      "DE",
      "FL",
      "ID",
      "IL",
      "IN",
      "LA",
      "MO",
      "NJ",
      "NV",
      "PA",
      "TN",
    ];
    // if (!(data.name in state_with_data)) {
    //   alert("No data for this state");
    // }
    if (!state_with_data.includes(data.name)) {
      alert(`No data for the state: ${data.name}.`);
    }
    finalViz = {
      $schema: "https://vega.github.io/schema/vega-lite/v5.json",
      config: { view: { continuousWidth: 300, continuousHeight: 200 } },
      data: {
        url: dlink,
      },
      background: null,
      hconcat: [
        {
          // row 1.
          vconcat: [
            {
              title: {
                text: "Restaurant has parking",
                fontSize: 15,
                color: "black",
              },
              width: 200,
              height: 120,
              mark: { type: "bar", width: { band: 0.7 }, tooltip: true },
              encoding: {
                color: { field: "has_parking", type: "ordinal" },
                x: { field: "has_parking", type: "ordinal" },
                y: {
                  aggregate: "count",
                  field: "has_parking",
                  type: "quantitative",
                },
              },
              selection: {
                selector092: {
                  type: "interval",
                  bind: "scales",
                  encodings: ["x", "y"],
                },
              },
            },
            {
              title: {
                text: "Animal friendly",
                fontSize: 15,
                color: "black",
              },
              width: 200,
              height: 120,
              mark: { type: "bar", width: { band: 0.7 }, tooltip: true },
              encoding: {
                color: { field: "animal_friendly", type: "ordinal" },
                x: { field: "animal_friendly", type: "ordinal" },
                y: {
                  aggregate: "count",
                  field: "animal_friendly",
                  type: "quantitative",
                },
              },
              selection: {
                selector092: {
                  type: "interval",
                  bind: "scales",
                  encodings: ["x", "y"],
                },
              },
            },
            // Plot
            {
              data: { url: dlink },
              title: {
                text: "Restaurant has wifi",
                fontSize: 15,
                color: "black",
              },
              width: 200,
              height: 120,
              mark: { type: "bar", width: { band: 0.7 }, tooltip: true },
              encoding: {
                color: {
                  field: "has_wifi",
                  type: "ordinal",
                  legend: { diable: false },
                },
                x: { field: "has_wifi", type: "ordinal" },
                y: {
                  aggregate: "count",
                  field: "has_wifi",
                  type: "quantitative",
                },
              },
              selection: {
                selector092: {
                  type: "interval",
                  bind: "scales",
                  encodings: ["x", "y"],
                },
              },
            },
          ],
        },
        {
          vconcat: [
            // Plot
            {
              title: {
                text: "Stars and Review Count",
                fontSize: 15,
                color: "black",
              },
              mark: "circle",
              encoding: {
                color: { field: "stars", type: "quantitative" },
                tooltip: [
                  { field: "name", type: "nominal" },
                  { field: "postal_code", type: "nominal" },
                  { field: "city", type: "nominal" },
                  { field: "address", type: "nominal" },
                  { field: "review_count", type: "quantitative" },
                  { field: "restaurant_type", type: "nominal" },
                  { field: "has_parking", type: "nominal" },
                  { field: "has_wifi", type: "nominal" },
                  { field: "animal_friendly", type: "nominal" },
                ],
                x: { field: "stars", type: "quantitative" },
                y: {
                  field: "review_count",
                  type: "quantitative",
                  axis: { title: "Review Count" },
                },
              },

              selector086: {
                type: "interval",
                bind: "scales",
                encodings: ["x", "y"],
              },
            },
            // Plot
            {
              title: {
                text: "Relationship between Stars and Restaurants' info",
                fontSize: 15,
                color: "black",
              },
              mark: "point",
              encoding: {
                color: { field: "stars", type: "quantitative" },
                tooltip: [
                  { field: "name", type: "nominal" },
                  { field: "postal_code", type: "nominal" },
                  { field: "city", type: "nominal" },
                  { field: "address", type: "nominal" },
                  { field: "review_count", type: "quantitative" },
                  { field: "restaurant_type", type: "nominal" },
                  { field: "has_parking", type: "nominal" },
                  { field: "has_wifi", type: "nominal" },
                  { field: "animal_friendly", type: "nominal" },
                ],
                x: { field: "stars", type: "quantitative" },
                y: {
                  field: "y_value",
                  type: "quantitative",
                  title: "Restaurants' business hours ",
                },
              },
              selection: {
                selector085: {
                  type: "single",
                  fields: ["y_axis"],
                  bind: {
                    input: "select",
                    options: [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ],
                    name: "select a day:  ",
                  },
                  init: { y_axis: "Monday" },
                },
                selector086: {
                  type: "interval",
                  bind: "scales",
                  encodings: ["x", "y"],
                },
              },
              transform: [
                {
                  fold: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ],
                  as: ["y_axis", "y_value"],
                },
                { filter: { selection: "selector085" } },
              ],
            },
          ],
        },
        {
          vconcat: [
            // Plot
            {
              title: {
                text: "Map for the state",
                fontSize: 15,
                color: "black",
              },
              projection: {
                type: "albersUsa",
              },
              width: 200,
              height: 400,
              layer: [
                {
                  data: {
                    // "url": "https://raw.githubusercontent.com/unitedstates/districts/gh-pages/states/FL/shape.geojson",
                    url: state_link,
                    format: {
                      type: "topojson",
                      feature: "states",
                    },
                  },
                  mark: {
                    type: "geoshape",
                    fill: "lightgray",
                    stroke: "white",
                    clip: true,
                    tooltip: true,
                  },
                },
                {
                  // "data": {"url": "https://raw.githubusercontent.com/yuwei97910/is445-group30-final-project/main/DataSet/yelp_academic_dataset_business_FL.csv"},
                  data: { url: dlink },
                  mark: { type: "circle", clip: true, tooltip: true },
                  encoding: {
                    longitude: { field: "longitude", type: "quantitative" },
                    latitude: { field: "latitude", type: "quantitative" },
                    color: { field: "unique_category", type: "nominal" },
                  },
                },
              ],
            },
          ],
        },
      ],
    };
    vegaEmbed("#vis", finalViz);
  },
});

// var dlink = "https://raw.githubusercontent.com/yuwei97910/is445-group30-final-project/main/DataSet/yelp_academic_dataset_business_IL.csv";
// var state_link = "https://raw.githubusercontent.com/unitedstates/districts/gh-pages/states/IL/shape.geojson";

finalViz = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  config: { view: { continuousWidth: 300, continuousHeight: 200 } },
  data: {
    url: "https://raw.githubusercontent.com/yuwei97910/is445-group30-final-project/main/DataSet/yelp_academic_dataset_business_IL.csv",
  },
  background: null,
  hconcat: [
    {
      // row 1.
      vconcat: [
        {
          title: {
            text: "Restaurant has parking",
            fontSize: 15,
            color: "black",
          },
          width: 200,
          height: 120,
          mark: { type: "bar", width: { band: 0.7 }, tooltip: true },
          encoding: {
            color: { field: "has_parking", type: "ordinal" },
            x: { field: "has_parking", type: "ordinal" },
            y: {
              aggregate: "count",
              field: "has_parking",
              type: "quantitative",
            },
          },
          selection: {
            selector092: {
              type: "interval",
              bind: "scales",
              encodings: ["x", "y"],
            },
          },
        },
        {
          title: {
            text: "Animal friendly",
            fontSize: 15,
            color: "black",
          },
          width: 200,
          height: 120,
          mark: { type: "bar", width: { band: 0.7 }, tooltip: true },
          encoding: {
            color: { field: "animal_friendly", type: "ordinal" },
            x: { field: "animal_friendly", type: "ordinal" },
            y: {
              aggregate: "count",
              field: "animal_friendly",
              type: "quantitative",
            },
          },
          selection: {
            selector092: {
              type: "interval",
              bind: "scales",
              encodings: ["x", "y"],
            },
          },
        },
        // Plot
        {
          title: {
            text: "Restaurant has wifi",
            fontSize: 15,
            color: "black",
          },
          width: 200,
          height: 120,
          mark: { type: "bar", width: { band: 0.7 }, tooltip: true },
          encoding: {
            color: {
              field: "has_wifi",
              type: "ordinal",
              legend: { diable: false },
            },
            x: { field: "has_wifi", type: "ordinal" },
            y: {
              aggregate: "count",
              field: "has_wifi",
              type: "quantitative",
            },
          },
          selection: {
            selector092: {
              type: "interval",
              bind: "scales",
              encodings: ["x", "y"],
            },
          },
        },
      ],
    },
    {
      vconcat: [
        // Plot
        {
          title: {
            text: "Stars and Review Count",
            fontSize: 15,
            color: "black",
          },
          mark: "circle",
          encoding: {
            color: { field: "stars", type: "quantitative" },
            tooltip: [
              { field: "name", type: "nominal" },
              { field: "postal_code", type: "nominal" },
              { field: "city", type: "nominal" },
              { field: "address", type: "nominal" },
              { field: "review_count", type: "quantitative" },
              { field: "restaurant_type", type: "nominal" },
              { field: "has_parking", type: "nominal" },
              { field: "has_wifi", type: "nominal" },
              { field: "animal_friendly", type: "nominal" },
            ],
            x: { field: "stars", type: "quantitative" },
            y: {
              field: "review_count",
              type: "quantitative",
              axis: { title: "Review Count" },
            },
          },

          selector086: {
            type: "interval",
            bind: "scales",
            encodings: ["x", "y"],
          },
        },
        // Plot
        {
          title: {
            text: "Relationship between Stars and Restaurants' info",
            fontSize: 15,
            color: "black",
          },
          mark: "point",
          encoding: {
            color: { field: "stars", type: "quantitative" },
            tooltip: [
              { field: "name", type: "nominal" },
              { field: "postal_code", type: "nominal" },
              { field: "city", type: "nominal" },
              { field: "address", type: "nominal" },
              { field: "review_count", type: "quantitative" },
              { field: "restaurant_type", type: "nominal" },
              { field: "has_parking", type: "nominal" },
              { field: "has_wifi", type: "nominal" },
              { field: "animal_friendly", type: "nominal" },
            ],
            x: { field: "stars", type: "quantitative" },
            y: {
              field: "y_value",
              type: "quantitative",
              title: "Restaurants' business hours ",
            },
          },
          selection: {
            selector085: {
              type: "single",
              fields: ["y_axis"],
              bind: {
                input: "select",
                options: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                name: "select a day:  ",
              },
              init: { y_axis: "Monday" },
            },
            selector086: {
              type: "interval",
              bind: "scales",
              encodings: ["x", "y"],
            },
          },
          transform: [
            {
              fold: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              as: ["y_axis", "y_value"],
            },
            { filter: { selection: "selector085" } },
          ],
        },
      ],
    },
    {
      vconcat: [
        // Plot
        {
          title: {
            text: "Map for the state",
            fontSize: 15,
            color: "black",
          },
          projection: {
            type: "albersUsa",
          },
          width: 200,
          height: 400,
          layer: [
            {
              data: {
                url: "https://raw.githubusercontent.com/unitedstates/districts/gh-pages/states/IL/shape.geojson",
                format: {
                  type: "topojson",
                  feature: "states",
                  tooltip: true,
                },
              },
              mark: {
                type: "geoshape",
                fill: "lightgray",
                stroke: "white",
                clip: true,
              },
            },
            {
              data: {
                url: "https://raw.githubusercontent.com/yuwei97910/is445-group30-final-project/main/DataSet/yelp_academic_dataset_business_IL.csv",
              },
              mark: { type: "circle", clip: true, tooltip: true },
              encoding: {
                longitude: { field: "longitude", type: "quantitative" },
                latitude: { field: "latitude", type: "quantitative" },
                color: { field: "unique_category", type: "nominal" },
              },
            },
          ],
        },
      ],
    },
  ],
};

vegaEmbed("#vis", finalViz);
