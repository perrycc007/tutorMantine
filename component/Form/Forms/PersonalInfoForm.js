import { useEffect, useState } from "react";
import { TextInput, Select, Button } from "@mantine/core";
import formField from "../FormModel/formField";
import { useUserForm } from "../FormModel/FormContext";
const inputfield = formField.inputfield.BasicInfo;
const checkboxfield = formField.checkboxfieldfield.agreewith;
const selectfield = formField.selectfield.BasicInfo;

const PersonalInfoForm = (props) => {
  const form = useUserForm({
    initialValues: { ...props.data },
    validateInputOnBlur: true,
    validate: {
      findus: (value) => (value.length > 0 ? null : "This field is required"),
      language: (value) =>
        value.length > 0 ? null : "Please select a language",
      name: (value) =>
        /^[a-zA-Z ]+$/.test(value) ? null : "Name should only contain letters",
      nationality: (value) =>
        value.length > 0 ? null : "Nationality is required",
      phoneno: (value) =>
        /^\d{8}$/.test(value) ? null : "Invalid phone number",
      address: (value) => (value.length > 5 ? null : "Address must be longer"),
      emergencycontact: (value) =>
        value.length > 0 ? null : "Emergency contact is required",
      emergencyrelationship: (value) =>
        value.length > 0 ? null : "Relationship is required",
      emergencyphone: (value) =>
        /^\d{8}$/.test(value) ? null : "Invalid phone number",
    },
  });

  useEffect(() => {
    form.setValues(props.data);
    form.resetDirty(props.data);
  }, [props.data]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (form.isValid()) {
          form.setValues((prev) => ({ ...prev, ...event }));
          const NewData = { ...form.values };
          props.updateForm(NewData);
        }
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
