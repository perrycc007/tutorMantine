import { useState, useEffect } from "react";
import { TextInput, Select, Button } from "@mantine/core";
import formField from "../FormModel/formField";
import { useUserForm } from "../FormModel/FormContext";

const inputfield = formField.inputfield.Education;
const selectfield = formField.selectfield.Education;
const Education = (props) => {
  const form = useUserForm();
  const loadInitialValues = (data) => {
    console.log("load");
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), 1000);
    });
  };
  useEffect(() => {
    loadInitialValues(props.data).then((values) => {
      form.setValues(values);
      form.resetDirty(values);
    });
  }, []);
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          form.setValues((prev) => ({ ...prev, ...event }));
          const NewData = { ...props.data, ...form.values };
          props.updateForm(NewData);
        }}
      >
        {Object.entries(inputfield).map(([key, value]) => (
          <TextInput
            key={value.name}
            label={value.label}
            placeholder={value.label}
            {...form.getInputProps(value.name)}
          />
        ))}
        {Object.entries(selectfield).map(([key, value]) => {
          return (
            <Select
              key={value.name}
              label={value.label}
              data={value.option}
              placeholder={value.label}
              {...form.getInputProps(value.name)}
            />
          );
        })}
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};
export default Education;
