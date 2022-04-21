import classes from "./styles/weatherInfo.module.css";
import Temp from "./Temp";
import TodaysWeather from "./TodaysWeather";
import WeatherDataPoints from "./WeatherDataPoints";
import { useEffect, useState } from "react";
import {
  getCurrWeatherData,
  getCurrWeatherDataWithTerm,
  getGeolocation,
  ipLookUp,
} from "../../api/api";
import AllowLoc from "./AllowLoc";
import Spinner from "../../Spinner";

const isItEmptyObj = (obj) => {
  if (!obj || typeof obj !== "object") return false;
  const isThere = Object.keys(obj).length !== 0;

  return isThere;
};

const WeatherInfo = ({ onWeatherInfo }) => {
  const [data, setData] = useState(null);
  const [latLon, setlatLon] = useState({});

  const [showIpLookUp, setShowIpLookUp] = useState(false);

  const getLatLon = async () => {
    try {
      const location = await getGeolocation();

      setlatLon(location);
    } catch (err) {
      console.log(err);

      setShowIpLookUp(true);
      setData({ error: "Location Not found" });
    }
  };

  const reqWithLatLonObj = async () => {
    const { lat, lon } = latLon;
    if (lat && lon) {
      let getData = await getCurrWeatherData(lat, lon);

      if (getData?.type === "error") return setData({ error: getData.message });

      setData(getData);
      return getData;
    }
  };

  const reqWithLatLonStr = async () => {
    if (typeof latLon !== "string") return;
    let getData = await getCurrWeatherDataWithTerm(latLon);
    if (getData?.type === "error") return setData({ error: getData.message });

    // update
    if (!getData) {
      return setData({ error: "Location Not found" });
    }

    //before it was string and its object of lan and lon from openweather response
    setlatLon(getData.coord);
    setData(getData);

    return getData;
  };

  useEffect(() => {
    const getRes = async () => {
      await getLatLon();
    };

    getRes();
  }, []);

  useEffect(() => {
    let mounted = true;
    const fetchWeather = async () => {
      try {
        if (!latLon || latLon?.error)
          return setData({ error: "Location Not found" });

        if (!mounted) return;

        if (isItEmptyObj(latLon)) reqWithLatLonObj();
        else reqWithLatLonStr();
      } catch (err) {
        if (err.message === "Too Many Requests")
          setData({ error: err.message });
        setData({ error: "Location Not found" });
      }
    };
    fetchWeather();

    return () => (mounted = false);
  }, [latLon]);

  useEffect(() => {
    const getRes = async () => {
      await data;
      onWeatherInfo({ data, latLon });
    };
    getRes();
  }, [data, latLon]);

  async function handleIpLookup() {
    setlatLon(await ipLookUp());
  }

  return (
    <>
      <div className={classes["clip-bg"]}>
        <section className={classes["section"]}>
          <h2 className={classes.secHeader}>Current Weather </h2>
          <div className={classes["weather-info"]}>
            {!isItEmptyObj(data) && !data?.error && <Spinner />}
            {data?.error && (
              <>
                <AllowLoc
                  handleIpLookup={handleIpLookup}
                  showIpLookUp={showIpLookUp}
                  error={
                    data?.error || "Allow Location to view weather details!"
                  }
                />
              </>
            )}
            {isItEmptyObj(data) && !data?.error && <Temp info={data.sec1} />}
            {isItEmptyObj(data) && !data?.error && (
              <TodaysWeather info={data.sec2} />
            )}
            {isItEmptyObj(data) && !data?.error && (
              <WeatherDataPoints info={data.sec3} />
            )}
          </div>
        </section>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#00b1ff"
          fill-opacity="1"
          d="M0,128L48,112C96,96,192,64,288,74.7C384,85,480,139,576,138.7C672,139,768,85,864,69.3C960,53,1056,75,1152,74.7C1248,75,1344,53,1392,42.7L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
    </>
  );
};

export default WeatherInfo;
