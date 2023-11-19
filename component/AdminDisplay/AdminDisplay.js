import CaseItemAdminStudent from "../Case/Admin/CaseItemAdminStudent";
import CaseItemAdminTutor from "../Case/Admin/CaseItemAdminTutor";
import AdminIdNavigation from "../AdminIdNavigation/AdminIdNavigation";
import {
  toggleCheck,
  toggleAvail,
  toggleStatus,
  toggleVerify,
} from "../Helper/AxiosFunction.js";
import { useState, Fragment } from "react";
export default function AdminDisplay(props) {
  console.log(props.match);

  let {
    tutor,
    notavailtutor,
    favouritetutorid,
    availtutor,
    checked,
    checking,
    idmatch,
    ...studentInfo
  } = props.match;
  console.log(tutor);
  const adminInfo = {
    notavailtutor,
    favouritetutorid,
    checked,
    checking,
  };
  const url = "http://localhost:3001/admin/toggleCheck";

  return (
    <Fragment>
      <div>
        <AdminIdNavigation passId={props.passIdHandler} studentIds={[]} />
        {/* <div>
          <CaseItemAdminStudent
            cases={studentInfo}
            toggleStatus={toggleStatus}
            adminInfo={adminInfo}
            admin="admin"
            type="cases"
          />
        </div>
        <CaseItemAdminTutor
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
