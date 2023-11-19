import React, { useState, useEffect } from "react";
import { TextInput, Select, Button, RangeSlider } from "@mantine/core";
import { useUserForm } from "../FormModel/FormContext";
import formField from "../FormModel/formField";

const StudentOthers = (props) => {
  const form = useUserForm();
  const [lessonAWeek, setLessonAWeek] = useState([1, 5]);
  const [payPerHour, setPayPerHour] = useState([100, 200]);
  const [hourPerLesson, setHourPerLesson] = useState([60, 200]);
  const inputfield = formField.inputfield.StudentOthers;
  const selectfield = formField.selectfield.StudentOthers;

  const loadInitialValues = (data) => {
    console.log("load", data);
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), 1000);
    });
  };
  useEffect(() => {
    loadInitialValues(props.data).then((values) => {
      if (values.lowestfrequency && values.highestfrequency) {
        form.setValues(values);
        form.resetDirty(values);
        setLessonAWeek([values.lowestfrequency, values.highestfrequency]);
        setHourPerLesson([values.lowestduration, values.highestduration]);
        setPayPerHour([values.lowestfee, values.highestfee]);
      }
    });
  }, [props.data]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        form.setValues((prev) => ({ ...prev, ...event }));
        form.setFieldValue("lowestfee", payPerHour[0]);
        form.setFieldValue("highestfee", payPerHour[1]);
        form.setFieldValue("lowestduration", hourPerLesson[0]);
        form.setFieldValue("highestduration", hourPerLesson[1]);
        form.setFieldValue("lowestfrequency", lessonAWeek[0]);
        form.setFieldValue("highestfrequency", lessonAWeek[1]);

        let NewData = {
          ...props.data,
          lowestfee: payPerHour[0],
          highestfee: payPerHour[1],
          lowestduration: hourPerLesson[0],
          highestduration: hourPerLesson[1],
          lowestfrequency: lessonAWeek[0],
          highestfrequency: lessonAWeek[1],
        };
        NewData = {
          ...NewData,
          ...form.values,
        };
        props.updateForm(NewData);
      }}
    >
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
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default StudentOthers;
