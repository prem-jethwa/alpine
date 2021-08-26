import { memo } from "react";
import classes from "./footer.module.css";
import logoSvg from "../../svg/yellow-logo.svg";

const Footer = () => {
  return (
    <>
      <div className={classes.height}></div>
      <footer className={classes["footer-con"]}>
        <div className={classes.footer}>
          <a target="_blank" href="https://premjethwa.com/">
            View Creator's Website
          </a>
          <p>
            Design & Developed by <span> PREM JETHWA </span>
          </p>
        </div>
        <img src={logoSvg} alt="brand logo" className={classes["logo-svg"]} />
        <p>copyright © 2021 all rights reserved</p>
        <p>
          <div className={classes.license}>
            <a
              target="_blank"
              rel="license"
              href="http://creativecommons.org/licenses/by-nc/4.0/"
            >
              <img
                alt="Creative Commons License"
                src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png"
              />
            </a>
            <br />
            This work is licensed under a
            <a
              target="_blank"
              rel="license"
              href="http://creativecommons.org/licenses/by-nc/4.0/"
            >
              CC International License
            </a>
            .
          </div>
        </p>
      </footer>
    </>
  );
};

export default memo(Footer);
