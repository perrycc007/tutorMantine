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
    console.log(item);
  }, [item]);

  const handleToggleCheck = async (idmatch, checkStatus) => {
    try {
      await toggleCheckAPI(idmatch, checkStatus);
    } catch (error) {
      alert(`Error occurred in toggleCheck: ${error.message}`);
    }
  };

  const handleToggleAvail = async (idmatch, availability) => {
    try {
      await toggleAvailAPI(idmatch, availability);
    } catch (error) {
      alert(`Error occurred in toggleAvail: ${error.message}`);
    }
  };

  const handleToggleStatus = async (tutorId, status, type) => {
    try {
      await toggleStatusAPI(tutorId, status, type);
    } catch (error) {
      alert(`Error occurred in toggleStatus: ${error.message}`);
    }
  };

  const handleToggleVerify = async (tutorId, verifyStatus) => {
    try {
      await toggleVerifyAPI(tutorId, verifyStatus);
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
          <Button onClick={handlePreviousClick} disabled={page === 1}>
            ←
          </Button>
          <p>
            {page}/{totalNumberofPage}
          </p>
          <Button
            onClick={handleNextClick}
            disabled={page === totalNumberofPage}
          >
            →
          </Button>
        </Group>
      </div>
    </>
  );
}
