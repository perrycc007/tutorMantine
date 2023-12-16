import React from "react";
import StudentApply from "./StudentApply"; // Replace with the correct path to your StudentApply component
import userStore from "../../stores/stores";
import {
  stripFormEventProperties,
  isFormComplete,
} from "../../component/Helper/HelperFunction";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  updateStudentAxios,
  createStudentAxios,
} from "../../component/Helper/AxiosFunction";
import { Card } from "@mantine/core";
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
    if (isFormComplete(stripFormEventProperties(values))) {
      updateNewStudentApplication(stripFormEventProperties(values));
      setData((prev) => ({
        ...prev,
        ...stripFormEventProperties(values),
      }));
      createStudentAxios(
        getuserId,
        stripFormEventProperties({ ...data, ...values })
      )
        .then((response) => {
          // Update application state and navigate to case page
          toCasePage();
        })
        .catch((error) => {
          alert(`Error creating new student application: ${error.message}`);
          setLoading(false);
        });
    } else {
      alert("Please fill in all the fields");
      setLoading(false);
    }
  };

  return (
    <section className="flex max-w-screen bg-cover bg-fixed min-h-screen bg-login-page bg-center sm:py-10">
      <div className="flex w-screen justify-center md:items-center mb-20">
        <div className="mt-4 mx-4 h-fit">
          <Card className="flex justify-center px-4 py-6 bg-white rounded-lg shadow-md sm:px-10 py-10 lg:px-16 py-16">
            <StudentApply
              data={data}
              updateApplication={updateApplicationHandler}
              handIn={handInHandler}
              type="newApplication"
            />
          </Card>
        </div>
      </div>
    </section>
  );
}

export default NewStudentApply;
