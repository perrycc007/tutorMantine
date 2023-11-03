import classes from "./CaseItem.module.css";
import { Accordion, Button } from "@mantine/core";
import EditForm from "../../Form/EditForm";
import { useState, useEffect } from "react";
import { IconHeartFilled } from "@tabler/icons-react";
import itemName from "../itemName";
import readDate from "../../Helper/HelperFunction";
import EditProfileForm from "../../Form/EditProfileForm";
function CaseItemAdminTutor(props) {
  const [status, setStatus] = useState(props.cases.status);
  const [verify, setVerify] = useState(props.cases.verify);
  const [notAvailStatus, setNotAvailStatus] = useState(false);
  const [checkStatus, setCheckStatus] = useState("");

  const toggleFavoriteStatusHandler = () => {
    props.toggleFavourite(props.id);
  };
  const toggleCheck = () => {
    if (checkStatus == "NOT_YET_CHECKED") {
      setCheckStatus("CHECKING");
      props.toggleCheckHandler(
        props.idmatch,
        props.cases.tutorid,
        "NOT_YET_CHECKED"
      );
    } else if (checkStatus == "CHECKING") {
      setCheckStatus("CHECKED");
      props.toggleCheckHandler(props.idmatch, props.cases.tutorid, "CHECKING");
    } else {
      setCheckStatus("NOT_YET_CHECKED");
      props.toggleCheckHandler(props.idmatch, props.cases.tutorid, "CHECKED");
    }
  };

  const verifyHandler = () => {
    if (verify == "已驗證") {
      setVerify("未驗證");
      props.toggleVerify(props.cases.tutorid, "未驗證", props.type);
    } else if (verify == "未驗證") {
      setVerify("已驗證");
      props.toggleVerify(props.cases.tutorid, "已驗證", props.type);
    }
  };
  const StatusHandler = () => {
    if (status == "open") {
      setStatus("close");
      props.toggleStatus(
        props.type == props.cases.tutorid,
        "close",
        props.type
      );
    } else if (status == "close") {
      setStatus("block");
      props.toggleStatus(
        props.type == props.cases.tutorid,
        "block",
        props.type
      );
    } else if (status == "block") {
      setStatus("open");
      props.toggleStatus(props.type == props.cases.tutorid, "open", props.type);
    }
  };
  const toggleNotAvail = () => {
    if (notAvailStatus) {
      setNotAvailStatus(false);
      props.toggleAvailHandler(false, props.idmatch, props.cases.tutorid);
    } else {
      setNotAvailStatus(true);
      props.toggleAvailHandler(true, props.idmatch, props.cases.tutorid);
    }
  };
  // const item = Object.entries(items).map((key, value) => {
  //   return key;
  // });

  useEffect(() => {
    if (props.checkStatus) {
      setCheckStatus("CHECKING");
    } else if (props.checkStatus) {
      setCheckStatus("CHECKED");
    } else {
      setCheckStatus("NOT_YET_CHECKED");
    }
    setNotAvailStatus(props.notAvailStatus);
  }, []);

  // const heading = item.slice(0, 5);
  // const sumamry = item.slice(6, 10);

  let { location, subject, availtime, studentid, ...items } = props.cases;
  const fee = (items.highestfee + items.lowestfee) / 2;
  const availtimeArray = availtime ? JSON.parse(availtime) : [];
  const timeForDisaply = availtimeArray
    ? availtimeArray.map((item) => {
        return readDate(item);
      })
    : [];
  let heading = {
    location: location ? JSON.parse(location) : [],
    subject: subject ? JSON.parse(subject) : [],
  };
  let verifyServer = "否";
  verifyServer = items.verify;

  return (
    <div>
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
          <p>履歷驗證狀態:{verifyServer}</p>
          <p className={classes.detail}>ID:{props.cases.tutorid}</p>
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
          {items.subgrade &&
            JSON.parse(items.subgrade).map((item) => (
              <p className={classes.detail} key={item.id}>
                {item.id} : {item.value}
              </p>
            ))}

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
              <Button variant="outlined" onClick={verifyHandler}>
                {verify == "已驗證" ? "教師已驗證" : "教師未驗證"}
              </Button>
            </div>

            <div>
              <EditProfileForm userid={props.cases.userid} type={"tutor"} />
            </div>

            <div className={classes.heading}>
              <Button onClick={toggleCheck}>{checkStatus}</Button>
              <Button onClick={toggleNotAvail}>
                {notAvailStatus ? "Not Available" : "Available"}
              </Button>
              {props.isFavouriteTutor ? <IconHeartFilled /> : ""}
            </div>
          </div>
        </Accordion.Panel>
      </Accordion>
    </div>
  );
}

export default CaseItemAdminTutor;
