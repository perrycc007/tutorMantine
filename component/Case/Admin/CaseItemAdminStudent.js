import classes from "./CaseItem.module.css";
import { Accordion, Button, Pagination } from "@mantine/core";
import EditForm from "../../Form/EditForm";
import { useState, useEffect } from "react";
import EditProfileForm from "../../Form/EditProfileForm";
import itemName from "../itemName";
import readDate from "../../Helper/HelperFunction";
function CaseItemAdminStudent(props) {
  const [status, setStatus] = useState(
    props.cases.status ? props.cases.status : "OPEN"
  );
  const [items, setItems] = useState(props.cases);
  const [heading, setHeading] = useState({});
  const [fee, setFee] = useState(props.cases.fee);
  const [availtimeArray, setAvailtimeArray] = useState([]);
  const [studentCase, setStudentCase] = useState({});
  const [studentProfile, setStudentProfile] = useState({});
  const [notAvailStatus, setNotAvailStatus] = useState(false);
  const [checkStatus, setCheckStatus] = useState("not yet checked");
  const StatusHandler = () => {
    if (status == "OPEN") {
      setStatus("CLOSE");
      props.toggleStatus(
        props.type == "tutor" ? props.cases.tutorId : props.cases.studentId,
        "CLOSE",
        props.type
      );
    } else if (status == "CLOSE") {
      setStatus("BLOCKED");
      props.toggleStatus(
        props.type == "tutor" ? props.cases.tutorId : props.cases.studentId,
        "BLOCKED",
        props.type
      );
    } else if (status == "BLOCKED") {
      setStatus("OPEN");
      props.toggleStatus(
        props.type == "tutor" ? props.cases.tutorId : props.cases.studentId,
        "OPEN",
        props.type
      );
    }
  };

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

  // const fee = (items.highestfee + items.lowestfee) / 2;

  useEffect(() => {
    if (props.cases.length !== 0) {
      let {
        studentLocations,
        studentSubjects,
        studentAvailTimes,
        studentId,
        address,
        agreewith,
        country,
        emergencycontact,
        emergencyphone,
        emergencyrelationship,
        findus,
        idprofile,
        language,
        name,
        nationality,
        others,
        phoneno,
        status,
        userId,
        ...items
      } = props.cases;
      setItems(items);
      let heading = {
        locations: studentLocations ? studentLocations.split(",") : [],
        subjects: studentSubjects ? studentSubjects.split(",") : [],
      };
      const studentInfo = {
        studentId: studentId,
        locations: studentLocations,
        subjects: studentSubjects,
        availtimes: studentAvailTimes,
        ...items,
      };
      const profile = {
        address,
        agreewith,
        country,
        emergencycontact,
        emergencyphone,
        emergencyrelationship,
        findus,
        idprofile,
        language,
        name,
        nationality,
        phoneno,
        userId,
      };
      setStudentCase(studentInfo);
      setStudentProfile(profile);
      console.log(profile);
      setHeading(heading);
      const availtimeArray = studentAvailTimes
        ? studentAvailTimes.split(",")
        : [];
      setAvailtimeArray(availtimeArray);
    }
  }, [props.cases]);

  return (
    <div className={classes.item}>
      {Object.entries(heading).map(([key, value]) => (
        <p className={classes.title} key={`${itemName[key]}value`}>
          {value}
        </p>
      ))}
      <p className={classes.title}>{`$${fee}/小時`}</p>

      <p className={classes.detail}>ID:{props.cases.studentId}</p>
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
          {availtimeArray.map((time) => (
            <p
              key={`${props.cases.studentId + time}`}
              className={classes.detail}
            >
              {time}
            </p>
          ))}
          <Button variant="outlined" onClick={StatusHandler}>
            {status == "OPEN"
              ? "個案已公開"
              : status == "CLOSE"
              ? "個案已隱藏"
              : "個案已封鎖"}
          </Button>
          <div>
            <EditForm
              cases={studentCase}
              studentId={props.cases.studentId}
              updateStudentForm={props.updateStudentForm}
            />
          </div>
        </div>

        <div>
          <EditProfileForm
            updateForm={props.updateForm}
            userId={props.cases.userId}
            cases={studentProfile}
            type={"student"}
          />
        </div>
      </div>
    </div>
  );
}

export default CaseItemAdminStudent;
