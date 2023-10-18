import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TimetableButton from "../../inputTool/TimetableButton";
import classes from "./TimeForm.module.css";

// const time = [{8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false, 17: false, 18: false, 19: false, 20: false, 21: false, 22: false}];
const days = [
  { 1: true, 2: false, 3: false, 4: true, 5: false, 6: false, 7: false },
];

const times = [];
const weekday = ["一", "二", "三", "四", "五", "六", "日"];

const timeValue = [
  "8am",
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
  "6pm",
  "7pm",
  "8pm",
  "9pm",
  "10pm",
];

[...Array(15)].map(() => {
  return times.push(days);
});

export default function TimeForm(props) {
  const [selected, setSelected] = useState([]);
  // const getUserid = userStore(state => state.userId);
  useEffect(() => {
    props.info && props.info.hasOwnProperty("availtime") == true
      ? console.log(JSON.parse(props.info.availtime))
      : "";
    props.info && props.info.hasOwnProperty("availtime") == true
      ? setSelected(JSON.parse(props.info.availtime) ?? [])
      : "";
  }, [props.info]);

  const checkboxHandler = (time) => {
    console.log(time);
    const existed = (time) => {
      return selected.findIndex((item) => item === time);
    };
    // updating
    if (existed(time) > -1) {
      const list = selected.filter((item) => item !== time);
      console.log(list);
      setSelected(list);
    } else {
      // adding
      const newlist = [...selected, time];
      setSelected(newlist);
      console.log(newlist);
    }
  };

  // submit
  const submitHandler = (event) => {
    event.preventDefault();
    props.submitHandler(selected, "availtime");
  };

  function inTheList(id) {
    const checked = selected ? selected.some((time) => time === id) : false;
    return checked;
  }

  useCallback(() => {
    console.log("rerendered");
  }, [checkboxHandler]);
  return (
    <div>
      <h1>期望時間</h1>
      <form onSubmit={submitHandler}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <p className={classes.time} style={{ color: "white" }}>
              時間\
            </p>
            {timeValue.map((item) => (
              <p key={item} className={classes.time}>
                {item}
              </p>
            ))}
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "auto",
              }}
            >
              {weekday.map((item) => (
                <p key={item} className={classes.day}>
                  {item}
                </p>
              ))}
            </div>
            {times.map((x, xi) => {
              return x.map((y, yi) => {
                return (
                  <div
                    key={`${x}+${y}1`}
                    style={{
                      textAlign: "center",
                      margin: "auto",
                      borderBottom: "0.5px solid #818181",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    {Object.entries(y).map(([key, value]) => {
                      return (
                        <TimetableButton
                          value={inTheList(
                            "d" + parseInt(`${key}`) + "t" + parseInt(`${xi}`)
                          )}
                          id={
                            "d" + parseInt(`${key}`) + "t" + parseInt(`${xi}`)
                          }
                          key={
                            "d" + parseInt(`${key}`) + "t" + parseInt(`${xi}`)
                          }
                          Click={checkboxHandler}
                        />
                      );
                    })}
                  </div>
                );
              });
            })}
          </div>
        </div>
        <div className={classes.buttonContainer}>
          <Button className={classes.Button} variant="outlined" type="submit">
            儲存
          </Button>
        </div>
      </form>
    </div>
  );
}
