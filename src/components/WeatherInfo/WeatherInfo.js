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

      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#00b1ff"
          fill-opacity="1"
          d="M0,96L48,80C96,64,192,32,288,21.3C384,11,480,21,576,37.3C672,53,768,75,864,90.7C960,107,1056,117,1152,117.3C1248,117,1344,107,1392,101.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg> */}

      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#00b1ff"
          fill-opacity="1"
          d="M0,128L48,112C96,96,192,64,288,74.7C384,85,480,139,576,154.7C672,171,768,149,864,128C960,107,1056,85,1152,74.7C1248,64,1344,64,1392,64L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg> */}

      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#00b1ff"
          fill-opacity="1"
          d="M0,32L48,32C96,32,192,32,288,37.3C384,43,480,53,576,69.3C672,85,768,107,864,117.3C960,128,1056,128,1152,112C1248,96,1344,64,1392,48L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg> */}

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#00b1ff"
          fill-opacity="1"
          d="M0,128L48,112C96,96,192,64,288,74.7C384,85,480,139,576,138.7C672,139,768,85,864,69.3C960,53,1056,75,1152,74.7C1248,75,1344,53,1392,42.7L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>

      {/* <svg
        id="wave"
        style="transform:rotate(180deg); transition: 0.3s"
        viewBox="0 0 1440 490"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
            <stop stop-color="rgba(243, 106, 62, 1)" offset="0%"></stop>
            <stop stop-color="rgba(255, 179, 11, 1)" offset="100%"></stop>
          </linearGradient>
        </defs>
        <path
          style="transform:translate(0, 0px); opacity:1"
          fill="url(#sw-gradient-0)"
          d="M0,392L48,343C96,294,192,196,288,187.8C384,180,480,261,576,318.5C672,376,768,408,864,408.3C960,408,1056,376,1152,334.8C1248,294,1344,245,1440,228.7C1536,212,1632,229,1728,245C1824,261,1920,278,2016,302.2C2112,327,2208,359,2304,343C2400,327,2496,261,2592,261.3C2688,261,2784,327,2880,294C2976,261,3072,131,3168,73.5C3264,16,3360,33,3456,98C3552,163,3648,278,3744,285.8C3840,294,3936,196,4032,171.5C4128,147,4224,196,4320,212.3C4416,229,4512,212,4608,179.7C4704,147,4800,98,4896,73.5C4992,49,5088,49,5184,114.3C5280,180,5376,310,5472,367.5C5568,425,5664,408,5760,392C5856,376,5952,359,6048,326.7C6144,294,6240,245,6336,204.2C6432,163,6528,131,6624,155.2C6720,180,6816,261,6864,302.2L6912,343L6912,490L6864,490C6816,490,6720,490,6624,490C6528,490,6432,490,6336,490C6240,490,6144,490,6048,490C5952,490,5856,490,5760,490C5664,490,5568,490,5472,490C5376,490,5280,490,5184,490C5088,490,4992,490,4896,490C4800,490,4704,490,4608,490C4512,490,4416,490,4320,490C4224,490,4128,490,4032,490C3936,490,3840,490,3744,490C3648,490,3552,490,3456,490C3360,490,3264,490,3168,490C3072,490,2976,490,2880,490C2784,490,2688,490,2592,490C2496,490,2400,490,2304,490C2208,490,2112,490,2016,490C1920,490,1824,490,1728,490C1632,490,1536,490,1440,490C1344,490,1248,490,1152,490C1056,490,960,490,864,490C768,490,672,490,576,490C480,490,384,490,288,490C192,490,96,490,48,490L0,490Z"
        ></path>
      </svg> */}
    </>
  );
};

export default WeatherInfo;

// DEPRICATED
//if (typeof latLon === "object" && !isItEmptyObj(latLon)) return; //update
// if (!isItEmptyObj(latLon)) return;

// if (latLon && latLon?.error) //update

// ////

// if (!latLon) return setData({ error: "Location Not found" });

// if (!mounted) return;

// getData = await getCurrWeatherDataWithTerm(latLon);
// if (getData?.type === "error")
//   return setData({ error: getData.message });

// if (!getData) {
//   //update
//   return setData({ error: "Location Not found" });
// }

// setlatLon(getData.coord);
// return setData(getData);
