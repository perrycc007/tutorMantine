import classes from "./CaseItem.module.css";
import { Accordion, Button, Pagination } from "@mantine/core";
import EditForm from "../Form/Forms/EditForm";
import { useState, useEffect } from "react";
import EditProfileForm from "../../Form/EditProfileForm";
import itemName from "../itemName";
import readDate from "../HelperFunction";
function CaseItemAdminStudent(props) {
  const [status, setStatus] = useState(
    props.cases.status ? props.cases.status : "open"
  );
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
      <Accordion>
        <Accordion.Item>
          <Accordion.Control>
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
          </Accordion.Control>
        </Accordion.Item>
        <Accordion.Panel>
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
                <EditForm
                  cases={props.cases}
                  studentid={props.cases.studentid}
                />
              </div>
            </div>

            <div>
              <EditProfileForm userid={props.cases.userid} type={"student"} />
            </div>
          </div>
        </Accordion.Panel>
      </Accordion>
    </div>
  );
}

export default CaseItemAdminStudent;
