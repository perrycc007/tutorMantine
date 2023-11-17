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
  const [data, setData] = useState();
  const [firstTime, setFirstTime] = useState(true);
  const [loading, setLoading] = useState(true);
  const getUserid = userStore((state) => state.userId);
  const updateNewStudentApplication = userStore(
    (state) => state.updateNewStudentApplication
  );
  const updateApplicationHandler = (values) => {
    updateNewStudentApplication(values);

    if (firstTime) {
      createStudentAxios(getUserid, stripFormEventProperties(values)).then(
        (response) => {
          updateNewStudentApplication({
            ...values,
            studentid: response.data.id,
          });
          setLoading(false);
          setData((prev) => ({
            ...prev,
            ...values,
            studentid: response.data.id,
          }));
          setFirstTime(false);
        }
      );
    } else {
      updateStudentAxios(getUserid, stripFormEventProperties(values));
      setData({
        ...prev,
        ...values,
      });
    }
  };
  return (
    <StudentApply data={data} updateApplication={updateApplicationHandler} />
  );
}

export default NewStudentApply;
