import { useEffect, useState } from "react";
import { TextInput, Select, Button } from "@mantine/core";
import formField from "../FormModel/formField";
import { useUserForm } from "../FormModel/FormContext";
const inputfield = formField.inputfield.BasicInfo;
const checkboxfield = formField.checkboxfieldfield.agreewith;
const selectfield = formField.selectfield.BasicInfo;

const PersonalInfoForm = (props) => {
  const form = useUserForm();

  useEffect(() => {
    form.setValues(props.data);
    form.resetDirty(props.data);
  }, [props.data]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        form.setValues((prev) => ({ ...prev, ...event }));
        const NewData = { ...form.values };
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

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default PersonalInfoForm;
