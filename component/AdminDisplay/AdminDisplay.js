import CaseItemAdminStudent from "../Case/Admin/CaseItemAdminStudent";
import CaseItemAdminTutor from "../Case/Admin/CaseItemAdminTutor";
import AdminIdNavigation from "../AdminIdNavigation/AdminIdNavigation";
import {
  toggleCheck,
  toggleAvail,
  toggleStatus,
  toggleVerify,
} from "../Helper/AxiosFunction.js";
import { useState, Fragment, useEffect } from "react";
export default function AdminDisplay(props) {
  const [studentInfo, setStudentInfo] = useState({});
  useEffect(() => {
    if (props.item.length !== 0) {
      let {
        tutor,
        notavailtutor,
        availtutor,
        checked,
        checking,
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
          <CaseItemAdminStudent
            cases={studentInfo}
            toggleStatus={toggleStatus}
            // adminInfo={adminInfo}
            admin="admin"
            type="cases"
          />
        </div>
        {/* <CaseItemAdminTutor
          cases={tutor}
          idmatch={idmatch}
          toggleCheckHandler={toggleCheck}
          toggleAvailHandler={toggleAvail}
          adminInfo={adminInfo}
          toggleStatusHandler={toggleStatus}
          toggleVerifyHandler={toggleVerify}
          type="tutor"
          admin="adminTutor"
        /> */}
      </div>
    </Fragment>
  );
}
