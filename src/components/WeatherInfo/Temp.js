import classes from "./styles/weatherInfo.module.css";

const Temp = (props) => {
  // const {country, temp} = props.info;
  return (
    <div className={classes["loc-temp"]}>
      <h1 className={classes.location}>
        {/* {props.info?.country && props.info.country},{" "} */}
        {props.info?.city && props.info.city}
      </h1>
      <div className={classes.temp}>
        <p>
          {props.info?.temp && Math.ceil(props.info.temp)}
          <span>&#176;</span>
        </p>
        <h3>Feels Like : {props.info?.feelsLike}</h3>
      </div>
    </div>
  );
};

export default Temp;
