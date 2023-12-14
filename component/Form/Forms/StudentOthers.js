import React, { useState, useEffect } from "react";
import { TextInput, Select, Button, RangeSlider, Alert } from "@mantine/core";
import { useUserForm } from "../FormModel/FormContext";
import formField from "../FormModel/formField";

const StudentOthers = (props) => {
  const form = useUserForm({
    validateInputOnBlur: true,
    validation: {
      genderrequirement: (value) => (value ? null : "Required"),
      expectation: (value) => (value ? null : "Required"),
      // lowestfrequency: (value) => (value ? null : "Required"),
      // highestfrequency: (value) => (value ? null : "Required"),
      // lowestfee: (value) => (value ? null : "Required"),
      // highestfee: (value) => (value ? null : "Required"),
      // lowestduration: (value) => (value ? null : "Required"),
      // highestduration: (value) => (value ? null : "Required"),
    },
  });
  const [lessonAWeek, setLessonAWeek] = useState([1, 5]);
  const [payPerHour, setPayPerHour] = useState([100, 200]);
  const [hourPerLesson, setHourPerLesson] = useState([60, 200]);
  const [showError, setShowError] = useState(false);
  const inputfield = formField.inputfield.StudentOthers;
  const selectfield = formField.selectfield.StudentOthers;
  const submitHanlder = (event) => {
    // event.preventDefault();
    form.setValues((prev) => ({ ...prev, ...event }));
    form.setFieldValue("lowestfee", payPerHour[0]);
    form.setFieldValue("highestfee", payPerHour[1]);
    form.setFieldValue("lowestduration", hourPerLesson[0]);
    form.setFieldValue("highestduration", hourPerLesson[1]);
    form.setFieldValue("lowestfrequency", lessonAWeek[0]);
    form.setFieldValue("highestfrequency", lessonAWeek[1]);

    let NewData = {
      ...props.data,
      ...form.values,
      lowestfee: payPerHour[0],
      highestfee: payPerHour[1],
      lowestduration: hourPerLesson[0],
      highestduration: hourPerLesson[1],
      lowestfrequency: lessonAWeek[0],
      highestfrequency: lessonAWeek[1],
    };
    console.log(NewData);
    props.updateForm(NewData);
    setShowError(false); // Reset error state if submission is successful
  };

  useEffect(() => {
    if (props.data) {
      if (props.data.lowestfrequency && props.data.highestfrequency) {
        console.log(props.data);
        form.setValues(props.data);
        form.resetDirty(props.data);
        setLessonAWeek([
          props.data.lowestfrequency,
          props.data.highestfrequency,
        ]);
        setHourPerLesson([
          props.data.lowestduration,
          props.data.highestduration,
        ]);
        setPayPerHour([props.data.lowestfee, props.data.highestfee]);
      }
    }
  }, [props.data]);

  return (
    <form onSubmit={form.onSubmit((values) => submitHanlder(values))}>
      {Object.entries(inputfield).map(([key, value]) => (
        <TextInput
          label={value.label}
          placeholder={value.label}
          key={value.label}
          {...form.getInputProps(value.name)}
        />
      ))}
      {Object.entries(selectfield).map(([key, value]) => (
        <Select
          label={value.label}
          data={value.option}
          placeholder={value.label}
          key={value.label}
          {...form.getInputProps(value.name)}
          //   value={formData[formField.selectfield.BasicInfo.name]}
        />
      ))}
      <p>一週堂數</p>
      <RangeSlider
        id="lessonAWeek"
        value={lessonAWeek}
        onChange={(newValue) => setLessonAWeek(newValue)}
        step={1}
        max={7}
        minRange={1}
        min={1}
        label={(value) => `${value}`}
      />
      <p>學費每小時</p>
      <RangeSlider
        id="payPerHour"
        value={payPerHour}
        onChange={(newValue) => setPayPerHour(newValue)}
        step={10}
        max={1000}
        min={60}
        label={(value) => `$${value}`}
      />
      <p>每堂總時數(分鐘)</p>
      <RangeSlider
        id="hourPerLesson"
        value={hourPerLesson}
        onChange={(newValue) => setHourPerLesson(newValue)}
        step={15}
        max={180}
        min={30}
        label={(value) => `${value}`}
      />
      <button type="submit">
        {props.types == "newApplication" ? "提交" : "更新"}
      </button>
    </form>
  );
};

export default StudentOthers;
