import React from "react";
import { useState, useCallback } from "react";
import MinSlider from "../../InputTool/Slider";
import Typography from "@mui/material/Typography";
import Axios from "axios";
import Button from "@mui/material/Button";
import classes from "./Form.module.css";
const Budget = (props) => {
  // const [fee,setFee] = useState([])
  const [status, setStatus] = useState(props.info.status);
  const info = props.info;
  const [userData, setUserData] = useState(info | initialUserData);
  console.log(info);
  async function toggleStatus(status) {
    const response = await Axios.patch(
      `http://localhost:3001/history/updateTutorStatus`,
      {
        tutorid: props.info.tutorid,
        status: status,
      }
    );
    response.data.result;
  }

  const StatusHandler = (event) => {
    event.preventDefault();
    if (status == "open") {
      setStatus("close");
      toggleStatus("close");
    } else {
      setStatus("open");
      toggleStatus("open");
    }
  };
  const initialUserData = {
    lowestfee: 60,
    highestfee: 1000,
  };

  // const FeeHandler = (value) => {
  //     setFee(value)
  // }
  const updateUserDataHandler = (value) => {
    value[0] == null ? (value[0] = 60) : value[0];
    value[1] == null ? (value[1] = 1000) : value[1];
    console.log(value);
    setUserData({ ...userData, lowestfee: value[0], highestfee: value[1] });
    console.log(userData);
  };

  const formHandler = (event) => {
    event.preventDefault();
    props.submitHandler(userData);
  };

  return (
    <React.Fragment>
      <h1>補習學費每小時</h1>
      <p className={classes.p}>
        理想時薪: {userData ? userData["highestfee"] : info["highestfee"]}
      </p>
      <p className={classes.p}>
        最低時薪: {userData ? userData["lowestfee"] : info["lowestfee"]}
      </p>
      <form className={classes.sliderForm}>
        <MinSlider
          step={20}
          max={1000}
          min={60}
          dmax={info ? info["highestfee"] : 100}
          dmin={info ? info["lowestfee"] : 200}
          minD={20}
          passValue={updateUserDataHandler}
        />
      </form>
      <div className={classes.buttonContainer}>
        {status != "block" ? (
          <Button
            className={classes.Button}
            variant="outlined"
            onClick={StatusHandler}
          >
            {status == "open" ? "按此隱藏簡歷" : "按此公開簡歷"}
          </Button>
        ) : (
          <Button disabled>此用戶暫時被封閉</Button>
        )}
        <Button
          className={classes.Button}
          variant="outlined"
          onClick={formHandler}
        >
          儲存
        </Button>
      </div>
    </React.Fragment>
  );
};

export default Budget;
