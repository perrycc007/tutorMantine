import React from "react";
import StudentApply from "./StudentApply"; // Replace with the correct path to your StudentApply component
import userStore from "../../../stores/stores";
function NewStudentApply() {
  const [data, setData] = useState();
  const NewStudentApplication = userStore(
    (state) => state.NewStudentApplication
  );
  const updateNewStudentApplication = userStore(
    (state) => state.updateNewStudentApplication
  );
  const updateApplicationHandler = (value) => {
    updateNewStudentApplication(value);
    setData(value);
  };
  return (
    <StudentApply
      data={NewStudentApplication}
      updateApplication={updateApplicationHandler}
    />
  );
}

export default NewStudentApply;
