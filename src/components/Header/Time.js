import classes from "./styles/header.module.css";
import React, { useState, useEffect } from "react";

const Time = () => {
  var [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  return <p className={classes.location}>{date.toLocaleTimeString()}</p>;
};

export default Time;
