import React from "react";
import StudentApply from "./StudentApply"; // Replace with the correct path to your StudentApply component
import userStore from "../../stores/stores";
import { stripFormEventProperties } from "../../component/Helper/HelperFunction";
import { useState } from "react";
import {
  updateStudentAxios,
  createStudentAxios,
} from "../../component/Helper/AxiosFunction";
function NewStudentApply() {
  const [data, setData] = useState({
    genderrequirement: "",
    expectation: "",
    lowestfee: 100,
    highestfee: 200,
    lowestduration: 60,
    highestduration: 120,
    lowestfrequency: 2,
    highestfrequency: 4,
    others: "",
    // agreewith: "",
    locations: [],
    availtimes: [],
    subjects: [],
  });
  const [firstTime, setFirstTime] = useState(true);
  const [loading, setLoading] = useState(true);
  const getUserid = userStore((state) => state.userId);
  const updateNewStudentApplication = userStore(
    (state) => state.updateNewStudentApplication
  );
  const updateApplicationHandler = (values) => {
    updateNewStudentApplication(values);

    if (firstTime) {
      createStudentAxios(
        getUserid,
        stripFormEventProperties({ ...data, ...values })
      ).then((response) => {
        console.log(response.data.studentid);
        updateNewStudentApplication({
          ...values,
          studentid: response.data.studentid,
        });
        setLoading(false);
        setData((prev) => ({
          ...prev,
          ...values,
          studentid: response.data.studentid,
        }));
        setFirstTime(false);
      });
    } else {
      updateStudentAxios(
        getUserid,
        stripFormEventProperties({ ...data, ...values })
      );
      setData((prev) => ({
        ...prev,
        ...values,
      }));
    }
  };
  return (
    <StudentApply data={data} updateApplication={updateApplicationHandler} />
  );
}

export default NewStudentApply;
