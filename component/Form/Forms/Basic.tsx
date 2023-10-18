import React from "react";
import { TextInput, Select, Button } from "@mantine/core";
import formField from "../FormModel/formField";

const inputfield = formField.inputfield.BasicInfo;
const checkboxfield = formField.checkboxfieldfield.agreewith;
const selectfield = formField.selectfield.BasicInfo;
const BasicForm = () => {
  return (
    <form>
      {Object.entries(inputfield).map(([key, value]) => (
        <TextInput
          label={value.label}
          placeholder={value.label}
          //   {...form.getInputProps(value.label)}
        />
      ))}
      {Object.entries(selectfield).map(([key, value]) => (
        <Select
          label={value.label}
          data={value.option}
          placeholder={value.label}
          //   value={formData[formField.selectfield.BasicInfo.name]}
        />
      ))}

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default BasicForm;
