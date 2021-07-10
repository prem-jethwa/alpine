import classes from "./styles/weatherInfo.module.css";
import Temp from "./Temp";
import TodaysWeather from "./TodaysWeather";
import WeatherDetails from "./WeatherDetails";
import { useEffect, useState } from "react";
import {
  getCurrWeatherData,
  getCurrWeatherDataWithTerm,
  getGeolocation,
} from "../../api/api";
import { WeatherContext } from "../../context/WeatherContext";
import AllowLoc from "./AllowLoc";
import Spinner from "../../Spinner";

const isItEmptyObj = (obj) => {
  if (!obj || typeof obj !== "object") return false;
  return Object.keys(obj).length !== 0;
};

const WeatherInfo = ({ onWeatherInfo }) => {
  const [data, setData] = useState(null);
  const [latLon, setlatLon] = useState({});

  const getLatLon = async () => {
    const location = await getGeolocation();

    setlatLon(location);
  };

  useEffect(() => {
    let mounted = true;
    const fetchWeather = async () => {
      try {
        let getData;

        if (!mounted) return;

        if (typeof latLon === "object" && !isItEmptyObj(latLon)) return;
        if (latLon && latLon?.error) {
          setData({ error: "Location Not found" });
        }

        if (typeof latLon === "object") {
          const { lat, lon } = latLon;

          if (lat && lon) {
            if (!mounted) return;
            getData = await getCurrWeatherData(lat, lon);

            if (getData?.type === "error")
              return setData({ error: getData.message });

            return setData(getData);
          }
        }

        if (!latLon) {
          return setData({ error: "Location Not found" });
        }

        if (!mounted) return;
        getData = await getCurrWeatherDataWithTerm(latLon);
        if (getData?.type === "error")
          return setData({ error: getData.message });

        if (!getData || isItEmptyObj()) {
          return setData({ error: "Location Not found" });
        }

        setlatLon(getData.coord);
        return setData(getData);
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

  useEffect(() => {
    const getRes = async () => {
      await getLatLon();
    };

    getRes();
  }, []);

  return (
    <section className={classes["section"]}>
      <h2 className={classes.secHeader}>Current Weather </h2>
      <div className={classes["weather-info"]}>
        {!isItEmptyObj(data) && !data?.error && <Spinner />}
        {data?.error && (
          <AllowLoc
            error={data?.error || "Allow Location to view weather details!"}
          />
        )}
        {isItEmptyObj(data) && !data?.error && <Temp info={data.sec1} />}
        {isItEmptyObj(data) && !data?.error && (
          <TodaysWeather info={data.sec2} />
        )}
        {isItEmptyObj(data) && !data?.error && (
          <WeatherDetails info={data.sec3} />
        )}
      </div>
    </section>
  );
};

export default WeatherInfo;
