import { useContext, useReducer, useEffect } from "react";
import classes from "./styles/weatherInfo.module.css";
import defaultImg from "../../img/default.png";
import clouds from "../../img/cloud.png";
import night from "../../img/night.png";
import rain from "../../img/rain.png";
import sun from "../../img/sun.png";
import { WeatherContext } from "../../context/WeatherContext";

const formatName = (name) => {
  const splited = name.toLowerCase().split(" ");

  const splitedLetters = splited[0].split("");

  return (
    splitedLetters[0].toUpperCase() +
    splitedLetters.slice(1).join("") +
    " " +
    splited.slice(1).join(" ")
  );
};

const reduser = (_, action) => {
  switch (action.weather) {
    case "rain":
      return { url: rain };

    case "clouds":
      return { url: clouds };

    case "day":
      return { url: sun };

    case "night":
      return { url: night };

    default:
      return { url: defaultImg };
  }
};

const giveWeather = (ctx) => {
  const main = ctx.data?.sec2?.main.toLowerCase();
  const hr = new Date().getHours();

  if (!main) return;
  if (main.includes("rain")) return "rain";

  if (main.includes("clouds") || main.includes("haze")) return "clouds";

  if (hr >= 18 || hr <= 3) {
    return "night";
  } else {
    return "day";
  }
};

const TodaysWeather = (props) => {
  const [state, dispatch] = useReducer(reduser, { url: defaultImg });

  const ctx = useContext(WeatherContext);
  const weather = giveWeather(ctx);

  useEffect(() => {
    dispatch({ weather });
  }, [weather]);

  // useEffect(() => {
  //   dispatch({ weather: "default" });
  // }, []);

  return (
    <div className={classes["todays-weather"]}>
      <h1>{props.info?.desc && formatName(props.info.desc)}</h1>
      <img
        className={classes["weather-img"]}
        src={`${state.url}`}
        alt="weather img"
      />
      {/* <p>{props.info?.desc && props.info.desc}</p> */}
    </div>
  );
};
// require('../../img/dummy-weather-img.png')
export default TodaysWeather;
