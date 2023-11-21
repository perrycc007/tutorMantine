import classes from "./CaseItem.module.css";
import { Accordion, Button, Pagination } from "@mantine/core";
import EditForm from "../../Form/EditForm";
import { useState, useEffect } from "react";
import { IconHeartFilled } from "@tabler/icons-react";
import itemName from "../itemName";
import readDate from "../../Helper/HelperFunction";
import EditProfileForm from "../../Form/EditProfileForm";
import usePagination from "../usePagination";
function CaseItemAdminTutor(props) {
  const [status, setStatus] = useState(props.cases.status);
  const [verify, setVerify] = useState(props.cases.verify);
  const [notAvailStatus, setNotAvailStatus] = useState(false);
  const [checkStatus, setCheckStatus] = useState("");
  const info = props.cases;
  const toggleFavoriteStatusHandler = () => {
    props.toggleFavourite(props.id);
  };

  const toggleCheck = (idmatch) => {
    if (checkStatus == "NOT_YET_CHECKED") {
      setCheckStatus("CHECKING");
      props.toggleCheck(idmatch, "CHECKING");
    } else if (checkStatus == "CHECKING") {
      setCheckStatus("CHECKED");
      props.toggleCheck(idmatch, "CHECKED");
    } else {
      setCheckStatus("NOT_YET_CHECKED");
      props.toggleCheck(idmatch, "NOT_YET_CHECKED");
    }
  };

  const verifyHandler = (tutorid) => {
    if (verify == "VERIFIED") {
      setVerify("NOT_VERIFIED");
      props.toggleVerify(tutorid, "NOT_VERIFIED");
    } else if (verify == "NOT_VERIFIED") {
      setVerify("VERIFIED");
      props.toggleVerify(tutorid, "VERIFIED");
    }
  };
  const StatusHandler = (tutorid) => {
    if (status == "OPEN") {
      setStatus("CLOSE");
      props.toggleStatus(tutorid, "CLOSE", props.type);
    } else if (status == "CLOSE") {
      setStatus("BLOCKED");
      props.toggleStatus(tutorid, "BLOCKED", props.type);
    } else if (status == "BLOCKED") {
      setStatus("OPEN");
      props.toggleStatus(tutorid, "OPEN", props.type);
    }
  };
  const toggleNotAvail = (idmatch) => {
    if (notAvailStatus) {
      setNotAvailStatus(false);
      props.toggleAvail(idmatch, false);
    } else {
      setNotAvailStatus(true);
      props.toggleAvail(idmatch, true);
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
    console.log(props.cases);
  }, []);

  let heading = {
    locations: info.locations ? info.locations.split(",") : [],
    subjects: info.subjects ? info.subjects.split(",") : [],
  };

  return (
    <Accordion.Item key={info.idmatch} value={JSON.stringify(info.idmatch)}>
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
        <p
          className={classes.title}
        >{`$${info.lowestFee}/小時-${info.highestFee}/小時`}</p>
      </Accordion.Control>

      <Accordion.Panel>
        <p>履歷驗證狀態:{verify == "VERIFIED" ? "教師已驗證" : "教師未驗證"}</p>
        <p className={classes.detail}>ID:{props.cases.tutorId}</p>
        {Object.entries(info).map(
          ([key, value]) =>
            itemName[key] !== undefined &&
            value !== null &&
            key !== "subjectGrade" && (
              <p className={classes.detail} key={itemName[key]}>
                {itemName[key]}: {value}
              </p>
            )
        )}
        {info.subjectGrade &&
          Object.entries(info.subjectGrade).map(([subjectKey, grade]) => (
            <p className={classes.detail} key={subjectKey}>
              {subjectKey} : {grade}
            </p>
          ))}

        <div className={classes.buttonContainer}>
          <div className={classes.summary}>
            <p className={classes.detail}>{info.availTimes}</p>
            <Button
              variant="outlined"
              onClick={() => StatusHandler(info.tutorId)}
            >
              {status == "OPEN"
                ? "個案已公開"
                : status == "CLOSE"
                ? "個案已隱藏"
                : "個案已封鎖"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => verifyHandler(info.tutorId)}
            >
              {verify == "VERIFIED" ? "教師已驗證" : "教師未驗證"}
            </Button>
          </div>

          <div>
            <EditProfileForm
              updateForm={props.updateForm}
              updateTutorForm={props.updateTutorForm}
              cases={info}
              type={"tutor"}
            />
          </div>

          <div className={classes.heading}>
            <Button onClick={() => toggleCheck(info.idmatch)}>
              {checkStatus}
            </Button>
            <Button onClick={() => toggleNotAvail(info.idmatch)}>
              {notAvailStatus ? "Not Available" : "Available"}
              {/* {props.isFavouriteTutor ? <IconHeartFilled /> : ""} */}
            </Button>
          </div>
        </div>
      </Accordion.Panel>
    </Accordion.Item>
  );
}

export default CaseItemAdminTutor;
