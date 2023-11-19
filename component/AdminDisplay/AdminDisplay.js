import CaseItemAdminStudent from "../Case/Admin/CaseItemAdminStudent";
import CaseItemAdminTutor from "../Case/Admin/CaseItemAdminTutor";
import AdminIdNavigation from "../AdminIdNavigation/AdminIdNavigation";
import { Accordion } from "@mantine/core";
import {
  toggleCheck,
  toggleAvail,
  toggleStatus,
  toggleVerify,
} from "../Helper/AxiosFunction.js";
import { useState, Fragment, useEffect } from "react";
export default function AdminDisplay(props) {
  const [studentInfo, setStudentInfo] = useState(null);
  useEffect(() => {
    if (props.item.length !== 0) {
      let {
        tutor,
        availiability,
        checkSTatus,
        matchstatus,
        idmatch,
        ...studentInfo
      } = props.item[0];
      setStudentInfo(studentInfo);
    }
  }, [props.item]);
  return (
    <Fragment>
      <div>
        <AdminIdNavigation
          passId={props.passIdHandler}
          listIds={props.studentList}
        />
        <div>
          {studentInfo && (
            <CaseItemAdminStudent
              cases={studentInfo}
              toggleStatus={toggleStatus}
              // adminInfo={adminInfo}
              admin="admin"
              type="cases"
            />
          )}
        </div>

        {props.item && (
          <CaseItemAdminTutor
            cases={props.item}
            // adminInfo={adminInfo}
            toggleCheckHandler={toggleCheck}
            toggleAvailHandler={toggleAvail}
            toggleStatusHandler={toggleStatus}
            toggleVerifyHandler={toggleVerify}
            type="tutor"
          />
        )}
      </div>
    </Fragment>
  );
}
