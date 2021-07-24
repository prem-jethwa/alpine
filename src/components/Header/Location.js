// import React, { Fragment, useState } from "react";
import { useContext, useEffect, useState } from "react";
import classes from "./styles/header.module.css";
import { WeatherContext } from "../../context/WeatherContext";

// module
const Location = () => {
  const [loc, setLoc] = useState({});
  const ctx = useContext(WeatherContext);

  useEffect(() => {
    const getLoc = async () => {
      const country = await ctx.data?.sec1?.country;
      const city = await ctx.data?.sec1?.city;
      setLoc({ country, city });
    };

    getLoc();
  }, [ctx]);

  return (
    <>
      <div className={classes["search-box"]}>
        {/* <input /> */}
        <h2>
          {(!loc.country || !loc.city) && "Loading..."}
          {loc.country && loc.city && loc.country + ", " + loc.city}
        </h2>
        {/* <button>Search</button> */}
      </div>
    </>
  );
};

export default Location;
