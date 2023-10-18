import React from 'react';
import StudentApply from './StudentApply'; // Replace with the correct path to your StudentApply component
import classes from "./NewStudentApply.module.css";
function NewStudentApply() {
  return (
    <div className={classes.formBackground}>
      <StudentApply />
    </div>
  );
}

export default NewStudentApply;
