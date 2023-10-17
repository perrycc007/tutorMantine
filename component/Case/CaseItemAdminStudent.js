import classes from "./CaseItem.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditForm from "../Form/Forms/EditForm";
import { useState, useEffect } from "react";
import BasicPopover from "../ui/BasicPopover";
import Button from "@mui/material/Button";
import itemName from "./itemName";
function CaseItemAdminStudent(props) {
  const [status, setStatus] = useState(props.cases.status?props.cases.status:'open');
  const [notAvailStatus, setNotAvailStatus] = useState(false);
  const [checkStatus, setCheckStatus] = useState("not yet checked");
  const StatusHandler = () => {
    if (status == "open") {
      setStatus("close");
      props.toggleStatus(
        props.type == "tutor" ? props.cases.tutorid : props.cases.studentid,
        "close",
        props.type
      );
    } else if (status == "close") {
      setStatus("block");
      props.toggleStatus(
        props.type == "tutor" ? props.cases.tutorid : props.cases.studentid,
        "block",
        props.type
      );
    } else if (status == "block") {
      setStatus("open");
      props.toggleStatus(
        props.type == "tutor" ? props.cases.tutorid : props.cases.studentid,
        "open",
        props.type
      );
    }
  };

  // const item = Object.entries(items).map((key, value) => {
  //   return key;
  // });

  useEffect(() => {
    if (props.checkedStatus) {
      setCheckStatus("checking");
    } else if (props.checkingStatus) {
      setCheckStatus("checked");
    } else {
      setCheckStatus("not yet checked");
    }
    setNotAvailStatus(props.notAvailStatus);
  }, []);

  // const heading = item.slice(0, 5);
  // const sumamry = item.slice(6, 10);

  let { location, subject, availtime, studentid, ...items } = props.cases;
  console.log(items);
  const fee = (items.highestfee + items.lowestfee) / 2;
  console.log(fee);
  const readDate = (notFormat) => {
    const time = notFormat.split("t");
    let dayOfWeek = [];
    let startingTime = `${time[1]}:00`;
    switch (time[0]) {
      case "d1":
        dayOfWeek = "星期一";
        break;
      case "d2":
        dayOfWeek = "星期二";
        break;
      case "d3":
        dayOfWeek = "星期三";
        break;
      case "d4":
        dayOfWeek = "星期四";
        break;
      case "d5":
        dayOfWeek = "星期五";
        break;
      case "d6":
        dayOfWeek = "星期六";
        break;
      case "d7":
        dayOfWeek = "星期日";
        break;

      default:
      // code block
    }

    const result = [dayOfWeek, startingTime];
    return result;
  };

  const availtimeArray = JSON.parse(availtime);
  const timeForDisaply = availtimeArray
    ? availtimeArray.map((item) => {
        return readDate(item);
      })
    : [];

  let heading = {
    location: JSON.parse(location),
    subject: JSON.parse(subject),
  };

  return (
    <div className={classes.item}>
      <Accordion className={classes.accordion}>
        <AccordionSummary
          className={classes.accordionSummary}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {Object.entries(heading).map(([key, value]) => (
            <p className={classes.title} key={`${itemName[key]}value`}>
              {typeof value == "object"
                ? value.map((item) => {
                    return ` ${item}`;
                  })
                : ""}
            </p>
          ))}
          <p className={classes.title}>{`$${fee}/小時`}</p>
        </AccordionSummary>
        <AccordionDetails className={classes.summary}>
          <p className={classes.detail}>ID:{props.cases.studentid}</p>
          {Object.entries(items).map(
            ([key, value]) =>
              itemName[key] !== undefined &&
              value !== null &&
              key !== "subgrade" && (
                <p className={classes.detail} key={itemName[key]}>
                  {itemName[key]}: {value}
                </p>
              )
          )}

          <div className={classes.buttonContainer}>
            <div className={classes.summary}>
              {timeForDisaply.map((time) => (
                <p
                  key={`${props.cases.studentid + time}`}
                  className={classes.detail}
                >
                  {time}
                </p>
              ))}
              <Button variant="outlined" onClick={StatusHandler}>
                {status == "open"
                  ? "個案已公開"
                  : status == "close"
                  ? "個案已隱藏"
                  : "個案已封鎖"}
              </Button>
              <div>
                <EditForm cases={props.cases} />
              </div>
            </div>

            <div>
              <BasicPopover userid={props.cases.userid} type={props.type} />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default CaseItemAdminStudent;
