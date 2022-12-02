var dlink =
  "https://raw.githubusercontent.com/yuwei97910/is445-group30-final-project/main/DataSet/yelp_academic_dataset_business_IL.json";
$("#map").usmap({
  // The click action
  click: function (event, data) {
    $("#clicked-state").text("You have selected this state: " + data.name);
    dlink = `https://raw.githubusercontent.com/yuwei97910/is445-group30-final-project/main/DataSet/yelp_academic_dataset_business_${data.name}.csv`;
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
      alert("No data for this state");
    }
    finalViz = {
      $schema: "https://vega.github.io/schema/vega-lite/v5.json",
      config: { view: { continuousWidth: 300, continuousHeight: 300 } },
      data: {
        url: dlink,
      },
      background: null,
      hconcat: [
        {
          vconcat: [
            {
              title: {
                text: "Restaurant has parking",
                fontSize: 15,
                color: "black",
              },
              width: 300,
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
              width: 300,
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
          ],
        },
        {
          vconcat: [
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
            {
              title: {
                text: "Restaurant has wifi",
                fontSize: 15,
                color: "black",
              },
              width: 300,
              mark: { type: "bar", width: { band: 0.7 }, tooltip: true },
              encoding: {
                color: { field: "has_wifi", type: "ordinal" },
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
      ],
    };
    vegaEmbed("#vis", finalViz);
  },
});
finalViz = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  config: { view: { continuousWidth: 300, continuousHeight: 300 } },
  data: {
    url: "https://raw.githubusercontent.com/yuwei97910/is445-group30-final-project/main/DataSet/yelp_academic_dataset_business_IL.csv",
  },
  background: null,
  hconcat: [
    {
      vconcat: [
        {
          title: {
            text: "Restaurant has parking",
            fontSize: 15,
            color: "black",
          },
          width: 300,
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
          width: 300,
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
      ],
    },
    {
      vconcat: [
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
        {
          title: {
            text: "Restaurant has wifi",
            fontSize: 15,
            color: "black",
          },
          width: 300,
          mark: { type: "bar", width: { band: 0.7 }, tooltip: true },
          encoding: {
            color: { field: "has_wifi", type: "ordinal" },
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
  ],
};
vegaEmbed("#vis", finalViz);
