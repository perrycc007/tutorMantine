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
  const [notAvailStatus, setNotAvailStatus] = useState(false);
  const [checkStatus, setCheckStatus] = useState("not yet checked");
  const StatusHandler = () => {
    if (status == "OPEN") {
      setStatus("CLOSE");
      props.toggleStatus(
        props.type == "tutor" ? props.cases.tutorid : props.cases.studentid,
        "CLOSE",
        props.type
      );
    } else if (status == "CLOSE") {
      setStatus("BLOCKED");
      props.toggleStatus(
        props.type == "tutor" ? props.cases.tutorid : props.cases.studentid,
        "BLOCKED",
        props.type
      );
    } else if (status == "BLOCKED") {
      setStatus("OPEN");
      props.toggleStatus(
        props.type == "tutor" ? props.cases.tutorid : props.cases.studentid,
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
        studentid,
        ...items
      } = props.cases;
      setItems(items);

      console.log(items);
      let heading = {
        locations: studentLocations ? studentLocations.split(",") : [],
        subjects: studentSubjects ? studentSubjects.split(",") : [],
      };
      const studentInfo = {
        studentid: studentid,
        lowestfrequency: items.lowestfrequency,
        lowestfee: items.lowestfee,
        lowestduration: items.lowestduration,
        language: items.language,
        others: items.others,
        expectation: items.expectation,
        genderrequirement: items.genderrequirement,
        status: items.status,
        highestfee: items.highestfee,
        highestfrequency: items.highestfrequency,
        highestduration: items.highestduration,
        level: items.level,
        lastOnline: items.lastOnline,
        userid: items.userid,
        favourites: items.favourites,
        matches: items.matches,
        user: items.user,
        locations: studentLocations,
        subjects: studentSubjects,
        availtimes: studentAvailTimes,
      };

      setStudentCase(studentInfo);
      console.log(heading);
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
          {availtimeArray.map((time) => (
            <p
              key={`${props.cases.studentid + time}`}
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
              studentid={props.cases.studentid}
              updateStudentForm={props.updateStudentForm}
            />
          </div>
        </div>

        <div>
          <EditProfileForm
            updateForm={props.updateForm}
            userid={props.cases.userid}
            cases={studentCase}
            type={"student"}
          />
        </div>
      </div>
    </div>
  );
}

export default CaseItemAdminStudent;
