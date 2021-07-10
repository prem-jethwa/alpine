import classes from "./styles/header.module.css";
import React, { useState, useEffect } from "react";

const Location = () => {
  var [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  return <p className={classes.location}>{date.toLocaleTimeString()}</p>;
};

export default Location;

// TRASH
// <select name="Location" className={classes.location}>
//   <option></option>
//   <option>Current Location</option>
//   <optgroup label="Country">
//     <option>India</option>
//     <option>US</option>
//   </optgroup>
//   <optgroup label="City">
//     <option>Delhi</option>
//     <option>Mumbai</option>
//   </optgroup>
// </select>
