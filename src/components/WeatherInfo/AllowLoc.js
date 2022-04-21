import classes from "./styles/weatherInfo.module.css";
const AllowLoc = ({ error, showIpLookUp, handleIpLookup }) => {
  return (
    <>
      <div className={classes.motel}>
        <h2>
          {" "}
          Please Allow Location To View the weather{" "}
          <a
            target="_blank"
            href="https://support.google.com/chrome/answer/142065?co=GENIE.Platform%3DDesktop&hl=en"
          >
            How To set ?
          </a>
        </h2>
        <p>Error:{error}</p>
        {showIpLookUp && (
          <button onClick={handleIpLookup} className={classes["iploopup-btn"]}>
            Take Location from My Ip address
          </button>
        )}
      </div>
    </>
  );
};

export default AllowLoc;
