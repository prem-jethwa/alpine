import classes from "./styles/weatherInfo.module.css";

const WeatherDetails = (props) => {
  return (
    <div className={classes["weather-details"]}>
      <h1>Data Points</h1>
      <p>
        <span>{props.info?.clouds && "Clouds : " + props.info.clouds}</span>
      </p>
      <p>
        <span>
          {props.info?.humidity && " Humidity : " + props.info.humidity}
        </span>
      </p>
      <p>
        {" "}
        <span>
          {props.info?.windSpeed && " Wind Speed : " + props.info.windSpeed}
        </span>
      </p>
      <p>
        <span>
          {props.info?.seaLevel &&
            "Sea level : " + props.info.seaLevel + " hPa"}
        </span>
      </p>
    </div>
  );
};

export default WeatherDetails;
