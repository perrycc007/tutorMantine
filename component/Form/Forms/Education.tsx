import React from "react";
import { TextInput, Select, Button } from "@mantine/core";
import formField from "../FormModel/formField";
import { useUserForm } from "../FormModel/FormContext";

const inputfield = formField.inputfield.Education;
const selectfield = formField.selectfield.Education;
const Education = () => {
  const form = useUserForm();
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
            {...form.getInputProps(value.name)}
          />
        ))}
        {Object.entries(selectfield).map(([key, value]) => {
          return (
            <Select
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
