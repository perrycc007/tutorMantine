import { useState, useEffect } from "react";
import { TextInput, Select, Button } from "@mantine/core";
import formField from "../FormModel/formField";
import { useUserForm } from "../FormModel/FormContext";

const inputfield = formField.inputfield.Education;
const selectfield = formField.selectfield.Education;
const Education = (props) => {
  const form = useUserForm();
  useEffect(() => {
    form.setValues(props.data);
    form.resetDirty(props.data);
  }, [props.data]);
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
