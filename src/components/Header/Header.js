import React from "react";
import Search from "./Search";
import Location from "./Location";
import classes from "./styles/header.module.css";
// import { useState, useEffect, useContext } from "react";
// import { WeatherContext } from "../../context/weatherContext";
// import { getGeolocation } from "../../api/api";

const Header = () => {
  return (
    <nav className="nav">
      <div className={`${classes["nav-wrapper"]} ${classes.container}`}>
        <h1 className={classes.logo}>Alpine</h1> {/* <img alt="logo" /> */}
        <div className={classes["search-location"]}>
          <Search />
          <Location />
        </div>
      </div>
    </nav>
  );
};

export default Header;

// TRASH
// return fetch('https://extreme-ip-lookup.com')
// .then(res => res.json())
// .then(data => console.log(data))
// .catch(err => console.log(err));

// const [latLon, setlatLon] = useState({});

// const getLatLon = async () => {
//   const location = await getGeolocation();

//   if (typeof location === "object" && location.error)
//     return setlatLon({ error: "Location access denied!" });

//   console.log(location);
//   setlatLon(location);
// };
// // Passing data to Context
// onLatLonChange(latLon);

// useEffect(() => {
//   getLatLon();
// }, []);

// passing search term to Search Component
// const onSearch = (term) => {
//   console.log(term);
// };
