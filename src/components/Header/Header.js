import React from "react";
import classes from "./styles/header.module.css";

const Header = () => {
  return (
    <nav className="nav">
      <div className={`${classes["nav-wrapper"]} ${classes.container}`}>
        <h1 className={classes.logo}>Alpine</h1> {/* <img alt="logo" /> */}
      </div>
    </nav>
  );
};

export default Header;
