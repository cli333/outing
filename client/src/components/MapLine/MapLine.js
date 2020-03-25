import React from "react";
import "./MapLine.css";
import { Source, Layer } from "react-map-gl";

const MapLine = ({ directions }) => {
  const geojson = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: directions.map(d => [d.startPoint.lng, d.startPoint.lat])
    }
  };
  return (
    <Source id="map-line-layer" type="geojson" data={geojson}>
      <Layer
        id="lineLayer"
        type="line"
        layout={{
          "line-join": "round",
          "line-cap": "round"
        }}
        paint={{
          "line-color": "rgba(0, 60, 255, 0.555)",
          "line-width": 5
        }}
      />
    </Source>
  );
};

export default MapLine;
