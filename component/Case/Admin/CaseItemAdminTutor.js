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

  const verifyHandler = (tutorId) => {
    if (verify == "VERIFIED") {
      setVerify("NOT_VERIFIED");
      props.toggleVerify(tutorId, "NOT_VERIFIED");
    } else if (verify == "NOT_VERIFIED") {
      setVerify("VERIFIED");
      props.toggleVerify(tutorId, "VERIFIED");
    }
  };
  const StatusHandler = (tutorId) => {
    if (status == "OPEN") {
      setStatus("CLOSE");
      props.toggleStatus(tutorId, "CLOSE", props.type);
    } else if (status == "CLOSE") {
      setStatus("BLOCKED");
      props.toggleStatus(tutorId, "BLOCKED", props.type);
    } else if (status == "BLOCKED") {
      setStatus("OPEN");
      props.toggleStatus(tutorId, "OPEN", props.type);
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
  }, []);

  let heading = {
    locations: info.locations
      ? typeof info.locations == "object"
        ? info.locations
        : info.locations.split(",")
      : [],
    subjects: info.subjects
      ? typeof info.subjects == "object"
        ? info.subjects
        : info.subjects.split(",")
      : [],
  };

  return (
    <Accordion.Item
      key={info.idmatch}
      value={JSON.stringify(info.idmatch) + "accordion"}
    >
      <Accordion.Control>
        {Object.entries(heading).map(([key, value]) => (
          <p key={`${key} value`}>
            {typeof value == "object"
              ? value.map((item) => {
                  return ` ${item}`;
                })
              : ""}
          </p>
        ))}
        <p>{`$${info.lowestfee}/小時-${info.highestfee}/小時`}</p>
      </Accordion.Control>

      <Accordion.Panel>
        <p>履歷驗證狀態:{verify == "VERIFIED" ? "教師已驗證" : "教師未驗證"}</p>
        <p>ID:{props.cases.tutorId}</p>
        {Object.entries(info).map(
          ([key, value]) =>
            itemName[key] !== undefined &&
            value !== null &&
            key !== "subjectGrade" && (
              <p key={key}>
                {itemName[key]}: {value}
              </p>
            )
        )}
        {info.subjectGrade &&
          Object.entries(info.subjectGrade).map(([subjectKey, grade]) => (
            <p key={subjectKey}>
              {subjectKey} : {grade}
            </p>
          ))}

        <div>
          <div>
            <p>{info.availtimes}</p>
            <button
              variant="outlined"
              onClick={() => StatusHandler(info.tutorId)}
            >
              {status == "OPEN"
                ? "個案已公開"
                : status == "CLOSE"
                ? "個案已隱藏"
                : "個案已封鎖"}
            </button>
            <button
              variant="outlined"
              onClick={() => verifyHandler(info.tutorId)}
            >
              {verify == "VERIFIED" ? "教師已驗證" : "教師未驗證"}
            </button>
          </div>

          <div>
            <EditProfileForm
              updateForm={props.updateForm}
              updateTutorForm={props.updateTutorForm}
              cases={info}
              index={props.index}
              type={"tutor"}
              passIndex={props.passIndex}
            />
          </div>

          <div>
            <button onClick={() => toggleCheck(info.idmatch)}>
              {checkStatus}
            </button>
            <button onClick={() => toggleNotAvail(info.idmatch)}>
              {notAvailStatus ? "Not Available" : "Available"}
              {/* {props.isFavouriteTutor ? <IconHeartFilled /> : ""} */}
            </button>
          </div>
        </div>
      </Accordion.Panel>
    </Accordion.Item>
  );
}

export default CaseItemAdminTutor;
