import React, { useState, useEffect } from "react";
import BasicInfo from "./Forms/BasicInfo";
import EducationForm from "./Forms/EducationForm";
import Grade from "./Forms/Grade";
import LocationForm from "./Forms/LocationForm";
import Subjects from "./Forms/Subjects";
import TimeForm from "./Forms/TimeForm";
import Budget from "./Forms/Budget";
import userStore from "../../stores/stores";
import Axios from "axios";

import classes from "./ProfileForm.module.css";
import Pagination from "@mui/material/Pagination";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
const ProfileForm = (props) => {
  const [profileData, setProfileData] = useState(props.profile);
  const [tutorData, setTutorData] = useState(props.tutor);
  const [changes, setChanges] = useState(false);
  const getUserid = userStore((state) => state.userId);
  const [page, setPage] = useState(1);
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const isTutor = userStore((state) => state.isTutor);
  useEffect(() => {
    console.log(props.profile);
  }, [props.profile]);
  const handleChange = (e, p) => {
    setPage(p);
    handleClick();
  };
  useEffect(() => {
    if (!isTutor) {
      setPage(1);
    }
  }, [isTutor]);

  async function submitHandler(value) {
    console.log(value);
    const info = profileData ? profileData : props.profile;
    const newInfo = { ...info, ...value };
    setProfileData(newInfo);
    setChanges(true);
    Axios.post(`http://localhost:3001/profile/`, {
      userid: getUserid ? getUserid : props.profile.userid,
      tutorid: getUserid ? getUserid : props.tutor.tutorid,
      information: newInfo,
    })
      .then((value) => {})
      .catch((error) => {
        alert(error.response.data.message);
      });

    // response.data.result;
  }
  async function listHandler(value, type) {
    const key = type;
    const info = tutorData ? tutorData : props.tutor;
    value = JSON.stringify(value);
    const newInfo = { ...info, [key]: value };
    setTutorData(newInfo);
    setChanges(true);
    const response = await Axios.patch(`http://localhost:3001/tutor/`, {
      userid: getUserid ? getUserid : props.profile.userid,
      information: newInfo,
    });
    const match = await Axios.post(`http://localhost:3001/match/tutor`, {
      userid: getUserid ? getUserid : props.profile.userid,
      information: newInfo,
    });
    response.data.result;
    match.data.result;
  }
  async function tutorHandler(value) {
    const info = tutorData ? tutorData : props.tutor;
    const newInfo = { ...info, ...value };
    setTutorData(newInfo);
    setChanges(true);
    const response = await Axios.patch(`http://localhost:3001/tutor`, {
      userid: getUserid ? getUserid : props.profile.userid,
      // tutorid: getUserid,
      information: newInfo,
    });
    const match = await Axios.patch(`http://localhost:3001/match/tutor`, {
      userid: getUserid ? getUserid : props.profile.userid,
      // tutorid: getUserid,
      information: newInfo,
    });
    response.data;
    match.data.result;
  }
  return (
    <React.Fragment>
      <div className={classes.formBackground}>
        <div className={classes.body}>
          <Paper>
            <div className={classes.container}>
              {props.admin && <Button onClick={props.closeModal}>close</Button>}
              {page == 1 && (
                <BasicInfo
                  submitHandler={submitHandler}
                  info={changes ? profileData : props.profile}
                  userid={getUserid}
                />
              )}
              {page == 2 && (
                <LocationForm
                  submitHandler={listHandler}
                  info={changes ? tutorData : props.tutor}
                  isTutor={isTutor}
                />
              )}
              {page == 3 && (
                <TimeForm
                  submitHandler={listHandler}
                  info={changes ? tutorData : props.tutor}
                />
              )}
              {page == 4 && (
                <EducationForm
                  submitHandler={tutorHandler}
                  info={changes ? tutorData : props.tutor}
                />
              )}
              {page == 5 && (
                <Grade
                  submitHandler={listHandler}
                  info={changes ? tutorData : props.tutor}
                />
              )}
              {page == 6 && (
                <Subjects
                  submitHandler={listHandler}
                  info={changes ? tutorData : props.tutor}
                />
              )}
              {page == 7 && (
                <Budget
                  submitHandler={tutorHandler}
                  info={changes ? tutorData : props.tutor}
                />
              )}

              {(isTutor && !props.admin) || props.type == "tutor" ? (
                <div className={classes.pagination}>
                  <Pagination
                    size="small"
                    count={7}
                    page={page}
                    onChange={handleChange}
                    variant="outlined"
                    color="primary"
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </Paper>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProfileForm;
