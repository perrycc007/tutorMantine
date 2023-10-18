import React, { useState, useEffect } from "react";
import BasicTabs from "../../ui/BasicTabs";
import subjects from "./Subject";
import Button from "@mui/material/Button";

const SubjectsForm = (props) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    props.info && props.info.hasOwnProperty("subject") == true
      ? console.log(JSON.parse(props.info.subject))
      : "";
    props.info && props.info.hasOwnProperty("subject") == true
      ? setList(JSON.parse(props.info.subject))
      : "";
  }, [props.info]);

  const listHandlerHandler = (value) => {
    setList(value);
    console.log(list);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    let isEmpty = true;
    if (list.length === 0) {
      isEmpty = true;
    } else {
      isEmpty = false;
    }
    if (!isEmpty) {
      props.submitHandler(list, "subject");
    } else {
      alert("請選至少一個科目");
    }
  };

  return (
    <React.Fragment>
      <h1>申請補習科目</h1>
      <form onSubmit={submitHandler}>
        <BasicTabs
          category={subjects}
          listHandler={listHandlerHandler}
          passValue={list}
        />
        <Button variant="outlined" type="submit">
          儲存
        </Button>
      </form>
    </React.Fragment>
  );
};
export default SubjectsForm;
