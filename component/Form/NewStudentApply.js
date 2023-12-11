import React from "react";
import StudentApply from "./StudentApply"; // Replace with the correct path to your StudentApply component
import userStore from "../../stores/stores";
import { stripFormEventProperties } from "../../component/Helper/HelperFunction";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  updateStudentAxios,
  createStudentAxios,
} from "../../component/Helper/AxiosFunction";
function NewStudentApply() {
  const router = useRouter();
  const toCasePage = () => {
    router.push("/cases");
  };
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
  const [loading, setLoading] = useState(true);
  const getuserId = userStore((state) => state.userId);
  const updateNewStudentApplication = userStore(
    (state) => state.updateNewStudentApplication
  );
  const updateApplicationHandler = (values) => {
    updateNewStudentApplication(values);
    setData((prev) => ({
      ...prev,
      ...values,
    }));
  };
  const handInHandler = (values) => {
    setLoading(true);
    createStudentAxios(
      getuserId,
      stripFormEventProperties({ ...data, ...values })
    ).then((response) => {
      // updateNewStudentApplication({
      //   ...values,
      //   studentId: response.data.studentId,
      // });
      // setLoading(false);
      // setData((prev) => ({
      //   ...prev,
      //   ...values,
      //   studentId: response.data.studentId,
      // }));
      toCasePage();
    });
  };

  return (
    <StudentApply
      data={data}
      updateApplication={updateApplicationHandler}
      handIn={handInHandler}
      type="newApplication"
    />
  );
}

export default NewStudentApply;
