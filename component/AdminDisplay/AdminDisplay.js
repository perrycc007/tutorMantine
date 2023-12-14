import CaseItemAdminStudent from "../Case/Admin/CaseItemAdminStudent";
import CaseItemAdminTutor from "../Case/Admin/CaseItemAdminTutor";
import AdminIdNavigation from "../AdminIdNavigation/AdminIdNavigation";
import { Group, Button, Accordion } from "@mantine/core";
import {
  toggleCheck as toggleCheckAPI,
  toggleAvail as toggleAvailAPI,
  toggleAdminStatus as toggleStatusAPI,
  toggleVerify as toggleVerifyAPI,
} from "../Helper/AxiosFunction.js";
import { useState, useEffect } from "react";

export default function AdminDisplay({
  passIndex,
  updateTutorForm,
  item,
  passIdHandler,
  studentList,
  updateForm,
  updateStudentForm,
  handlePreviousClick,
  handleNextClick,
  page,
  totalNumberofPage,
}) {
  const [studentInfo, setStudentInfo] = useState(null);

  useEffect(() => {
    if (item.length !== 0) {
      const {
        tutor,
        availiability,
        checkSTatus,
        matchstatus,
        idmatch,
        ...rest
      } = item[0];
      setStudentInfo(rest);
    }
  }, [item]);

  const handleToggleCheck = async (params) => {
    try {
      await toggleCheckAPI(params);
    } catch (error) {
      alert(`Error occurred in toggleCheck: ${error.message}`);
    }
  };

  const handleToggleAvail = async (params) => {
    try {
      await toggleAvailAPI(params);
    } catch (error) {
      alert(`Error occurred in toggleAvail: ${error.message}`);
    }
  };

  const handleToggleStatus = async (params) => {
    try {
      await toggleStatusAPI(params);
    } catch (error) {
      alert(`Error occurred in toggleStatus: ${error.message}`);
    }
  };

  const handleToggleVerify = async (params) => {
    try {
      await toggleVerifyAPI(params);
    } catch (error) {
      alert(`Error occurred in toggleVerify: ${error.message}`);
    }
  };

  return (
    <>
      <div>
        <AdminIdNavigation passId={passIdHandler} listIds={studentList} />
        {studentInfo && (
          <CaseItemAdminStudent
            cases={studentInfo}
            toggleStatus={handleToggleStatus}
            updateForm={updateForm}
            updateStudentForm={updateStudentForm}
            passIndex={passIndex}
            admin="admin"
            type="cases"
          />
        )}

        <Accordion>
          {item.map(
            (
              { idmatch, tutor, availiability, checkSTatus, matchstatus },
              index
            ) => (
              <CaseItemAdminTutor
                key={idmatch}
                index={index}
                cases={{
                  ...tutor,
                  availiability,
                  checkSTatus,
                  matchstatus,
                  idmatch,
                }}
                updateForm={updateForm}
                updateTutorForm={updateTutorForm}
                toggleCheck={handleToggleCheck}
                toggleAvail={handleToggleAvail}
                toggleStatus={handleToggleStatus}
                toggleVerify={handleToggleVerify}
                type="tutor"
                passIndex={passIndex}
              />
            )
          )}
        </Accordion>

        <Group className="flex justify-center">
          <button onClick={handlePreviousClick} disabled={page === 1}>
            ← Previous
          </button>
          <p>
            {page}/{totalNumberofPage}
          </p>
          <button
            onClick={handleNextClick}
            disabled={page === totalNumberofPage}
          >
            Next →
          </button>
        </Group>
      </div>
    </>
  );
}
