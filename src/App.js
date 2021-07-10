import React, { useState, useEffect, useCallback, useContext } from "react";
import Header from "./components/Header/Header";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";
import "./globalStyles.css";
import { WeatherContext } from "./context/WeatherContext";
import Map from "./components/Map/Map";
import News from "./components/News/News";
import Footer from "./components/Footer/Footer";
import { testReq } from "./api/api";

// Configure evn variables
// require("dotenv").config();

const App = () => {
  const [isRateLimitExist, setIsRateLimitExist] = useState(true);
  const [weatherData, setWeatherData] = useState({});
  const [latLon, setLatLon] = useState({});
  const [ctxValue, setCtxValue] = useState({});

  useEffect(() => {
    const testingRateLimit = async () => {
      try {
        const data = await testReq();

        console.log(data);
      } catch (err) {
        console.log(err);
        setIsRateLimitExist(false);
      }
    };
    testingRateLimit();
  }, []);

  // Setting Weather Data
  const getWeatherInfo = (data) => {
    setWeatherData(data);
  };

  useEffect(() => {
    setCtxValue({
      data: weatherData.data,
      latLon,
    });
    setLatLon(weatherData.latLon);
  }, [weatherData]);

  return (
    <WeatherContext.Provider value={ctxValue}>
      <Header data={ctxValue} />
      {!isRateLimitExist && (
        <div className="toomany">
          Too Many Reloading Please Try after Some time...
        </div>
      )}
      {isRateLimitExist && (
        <>
          {" "}
          <WeatherInfo onWeatherInfo={getWeatherInfo} />
          <Map />
          <News />
        </>
      )}
      <Footer />
    </WeatherContext.Provider>
  );
};

export default App;
