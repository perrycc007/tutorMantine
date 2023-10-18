import { useState, useEffect } from "react";
import classes from "./TimetableButton.module.css";
const TimetableButton = (props) => {
  const [clicked, setClicked] = useState();
  const toggle = () => {
    setClicked((prevState) => !prevState);
    props.Click(props.id);
  };

  const contentClassname = clicked
    ? classes.toggleButtonClose
    : classes.toggleButton;

  useEffect(() => {
    setClicked(props.value);
  }, [props.value]);

  return (
    <span id={props.id} onClick={toggle} className={contentClassname}></span>
  );
};
export default TimetableButton;
