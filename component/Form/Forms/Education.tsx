import React from "react";
import { TextInput, Select, Button } from "@mantine/core";
import formField from "../FormModel/formField";

const inputfield = formField.inputfield.Education;
const selectfield = formField.selectfield.Education;
const Education = () => {
  return (
    <>
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
    </>
  );
};
export default Education;
