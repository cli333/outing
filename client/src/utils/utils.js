const turnTypes = {
  "-1": "destination",
  0: "straight",
  1: "slight right",
  2: "right",
  3: "sharp right",
  4: "reverse",
  5: "sharp left",
  6: "left",
  7: "slight left",
  8: "right uturn",
  9: "left uturn",
  10: "right merge",
  11: "left merge",
  12: "right on ramp",
  13: "left on ramp",
  14: "right off ramp",
  15: "left off ramp",
  16: "right fork",
  17: "left fork",
  18: "straight fork",
};

const defaultLocation = {
  id: "place.7397503093427640",
  type: "Feature",
  place_type: ["place"],
  relevance: 1,
  properties: {
    wikidata: "Q65",
  },
  text: "Los Angeles",
  place_name: "Los Angeles, California, United States",
  bbox: [
    -118.521456965901,
    33.9018913203336,
    -118.121305008073,
    34.161440999758,
  ],
  center: [-118.2439, 34.0544],
  geometry: {
    type: "Point",
    coordinates: [-118.2439, 34.0544],
  },
  context: [
    {
      id: "region.11319063928738010",
      short_code: "US-CA",
      wikidata: "Q99",
      text: "California",
    },
    {
      id: "country.9053006287256050",
      short_code: "us",
      wikidata: "Q30",
      text: "United States",
    },
  ],
};

export { turnTypes, defaultLocation };
