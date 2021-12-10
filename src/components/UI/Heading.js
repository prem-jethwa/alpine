import classes from "./heading.module.css";

function Heading(props) {
  return (
    <h2 className={classes["header-con"]} {...props}>
      {props.heading}
    </h2>
  );
}

export default Heading;
