import L, { LatLngExpression } from "leaflet";
import React, { useState, useEffect, useContext, memo } from "react";
import { MapContainer } from "react-leaflet";
import AllLayers from "./AllLayers";
import { WeatherContext } from "../../context/WeatherContext";

import classes from "./map.module.css";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const [latLon, setlatLon] = useState([]);

  const ctx = useContext(WeatherContext);

  useEffect(() => {
    setlatLon(ctx.latLon);
  }, [ctx.latLon]);

  const position = [latLon?.lat, latLon?.lon];

  return (
    <>
      <div className={classes["map"]}>
        <h2>
          Weather Map <div></div>
        </h2>

        {position && position[0] && (
          <MapContainer
            center={latLon}
            className={classes["map-container"]}
            zoom={8}
            scrollWheelZoom={false}
          >
            <AllLayers latLon={latLon} />
          </MapContainer>
        )}
      </div>
    </>
  );
};

export default memo(Map);
