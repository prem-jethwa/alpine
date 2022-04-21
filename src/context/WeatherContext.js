import React from "react";

export const WeatherContext = React.createContext({
  data: {},
  latLon: [],
});

export default WeatherContext.Provider;
