import React, { useState, useEffect } from "react";
import StudentOthers from "./Forms/StudentOthers";
import LocationForm from "./Forms/LocationForm";
import Subjects from "./Forms/Subjects";
import TimeForm from "./Forms/TimeForm";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import userStore from "../../stores/stores";
import classes from "./ProfileForm.module.css";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Axios from "axios";
const StudentApply = (props) => {
  const student = { location: "[]", subject: "[]", availtime: "[]" };
  const getUserid = userStore((state) => state.userId);
  const [changes, setChanges] = useState(false);
  const [studentid, setStudentid] = useState(props.studentid | "");
  const [studentData, setStudentData] = useState(props.cases | "");
  const [isStarted, setIsStarted] = useState(false);
  const [page, setPage] = useState(1);
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleChange = (e, p) => {
    setPage(p);
    handleClick();
  };

  useEffect(() => {
    props.studentid ? setStudentid(props.studentid) : "";
    if (props.type == "history") {
      setIsStarted(true);
    }
  }, []);

  async function firstlistHandler(value, type) {
    const key = type;
    console.log(key);
    value = JSON.stringify(value);
    const newInfo = { [key]: value };
    const response = await Axios.post(`http://localhost:3001/student`, {
      userid: getUserid,
      information: newInfo,
    });
    // console.log(response.data.result.studentid)
    setStudentid(response.data.result.studentid);
    setStudentData(newInfo);
    setChanges(true);
    console.log("newInfo", newInfo, studentData);
    setIsStarted(true);
  }

  async function listHandler(value, type) {
    if (!isStarted) {
      return alert("請完成第 1 頁");
    } else {
      const key = type;
      value = JSON.stringify(value);
      const info = studentData ? studentData : props.cases;
      const newInfo = { ...info, [key]: value };
      setStudentData(newInfo);
      setChanges(true);
      console.log("newInfo", newInfo);
      const response = await Axios.patch(`http://localhost:3001/student`, {
        studentid: studentid,
        information: newInfo,
      });
      console.log(response.data.result);
      const match = await Axios.post(`http://localhost:3001/match/student`, {
        studentid: studentid,
        information: newInfo,
      });
      console.log(match.data.result);
    }
  }
  async function studentHandler(value) {
    if (!isStarted) {
      return alert("請完成第 1 頁");
    } else {
      console.log(value);
      const info = studentData ? studentData : props.cases;
      const newInfo = { ...info, ...value };
      setStudentData(newInfo);
      setChanges(true);
      console.log("newInfo", newInfo);
      const response = await Axios.patch(`http://localhost:3001/student/`, {
        // userid: 1,
        studentid: studentid,
        information: newInfo,
      });
      console.log(response.data.result);
      const match = await Axios.post(`http://localhost:3001/match/student`, {
        studentid: studentid,
        // tutorid: getUserid,
        information: newInfo,
      });
      console.log(match.data.result);
    }
  }
  return (
    <React.Fragment>
      <div className={classes.modalBody}>
        <Paper>
          {props.type == "history" && (
            <div className={classes.ModalCloseButtonContainer}>
              <Button
                variant="text"
                onClick={props.closeModalHanlder}
                startIcon={<CloseIcon />}
              ></Button>
            </div>
          )}
          <div className={classes.modalContainer}>
            {page == 1 && (
              <LocationForm
                submitHandler={studentid == "" ? firstlistHandler : listHandler}
                info={changes ? studentData : props.cases}
              />
            )}
            {page == 2 && (
              <TimeForm
                submitHandler={listHandler}
                info={changes ? studentData : props.cases}
              />
            )}
            {page == 3 && (
              <StudentOthers
                submitHandler={studentHandler}
                info={changes ? studentData : props.cases}
              />
            )}
            {page == 4 && (
              <Subjects
                submitHandler={listHandler}
                info={changes ? studentData : props.cases}
              />
            )}
            <div className={classes.pagination}>
              <Pagination
                size="small"
                count={4}
                page={page}
                onChange={handleChange}
                variant="outlined"
                color="primary"
              />
            </div>
          </div>
        </Paper>
      </div>
    </React.Fragment>
  );
};

export default StudentApply;
