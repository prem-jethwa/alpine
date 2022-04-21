import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";
import Provider from "./context/WeatherContext";
import Map from "./components/Map/Map";
import News from "./components/News/News";
import Footer from "./components/Footer/Footer";
import { testReq } from "./api/api";
import "./globalStyles.css";

const App = () => {
  const [isRateLimitExist, setIsRateLimitExist] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [latLon, setLatLon] = useState({});
  const [ctxValue, setCtxValue] = useState({});

  useEffect(() => {
    const testingRateLimit = async () => {
      try {
        await testReq();
      } catch (err) {
        console.log(err);
        setIsRateLimitExist(true);
      }
    };
    testingRateLimit();
  }, []);

  // Setting Weather Data
  const getWeatherInfo = (data) => {
    setWeatherData(data);
  };

  useEffect(() => {
    setLatLon(weatherData.latLon);
    setCtxValue({
      data: weatherData.data,
      latLon: weatherData.latLon,
    });
  }, [weatherData]);

  return (
    <Provider value={ctxValue}>
      <Header data={ctxValue} />
      {isRateLimitExist ? (
        <div className="toomany">
          Too Many Reloading Please Try after Some time...
        </div>
      ) : (
        <>
          <WeatherInfo onWeatherInfo={getWeatherInfo} />
          {!weatherData?.data?.error && <Map />}
          <News />
        </>
      )}
      <Footer />
    </Provider>
  );
};

export default App;
