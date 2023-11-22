import CaseItemAdminStudent from "../Case/Admin/CaseItemAdminStudent";
import CaseItemAdminTutor from "../Case/Admin/CaseItemAdminTutor";
import AdminIdNavigation from "../AdminIdNavigation/AdminIdNavigation";
import { Group, Button, Accordion } from "@mantine/core";
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
              updateForm={props.updateForm}
              updateStudentForm={props.updateStudentForm}
              admin="admin"
              type="cases"
            />
          )}
        </div>

        <Accordion>
          {props.item.map((item) => {
            const info = {
              ...item.tutor,
              availiability: item.availiability,
              checkSTatus: item.checkSTatus,
              matchstatus: item.matchstatus,
              idmatch: item.idmatch,
            };

            return (
              <div>
                <CaseItemAdminTutor
                  cases={info}
                  key={item.idmatch}
                  updateForm={props.updateForm}
                  updateTutorForm={props.updateTutorForm}
                  toggleCheck={toggleCheck}
                  toggleAvail={toggleAvail}
                  toggleStatus={toggleStatus}
                  toggleVerify={toggleVerify}
                  type="tutor"
                />
              </div>
            );
          })}
        </Accordion>
        <Group>
          <Button
            onClick={props.handlePreviousClick}
            disabled={props.page === 1}
          >
            ← Previous
          </Button>
          <p>
            {props.page}/{props.totalNumberofPage}
          </p>
          <Button
            onClick={props.handleNextClick}
            disabled={props.page === props.totalNumberofPage}
          >
            Next →
          </Button>
        </Group>
      </div>
    </Fragment>
  );
}
