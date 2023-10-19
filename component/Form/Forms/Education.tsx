import React from "react";
import { TextInput, Select, Button } from "@mantine/core";
import formField from "../FormModel/formField";
import { useUserForm } from "../FormModel/FormContext";

const inputfield = formField.inputfield.Education;
const selectfield = formField.selectfield.Education;
const Education = () => {
  const form = useUserForm();
  console.log(form.values);
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          console.log(form.values);
        }}
      >
        {Object.entries(inputfield).map(([key, value]) => (
          <TextInput
            label={value.label}
            placeholder={value.label}
            //   {...form.getInputProps(value.label)}
          />
        ))}
        {Object.entries(selectfield).map(([key, value]) => {
          console.log(value.option);
          return (
            <Select
              label={value.label}
              data={value.option}
              placeholder={value.label}
              //   value={formData[formField.selectfield.BasicInfo.name]}
            />
          );
        })}
      </form>
    </>
  );
};
export default Education;
