import { useState, useEffect } from "react";
import { TextInput, Select, Button, Alert } from "@mantine/core";
import formField from "../FormModel/formField";
import { useUserForm } from "../FormModel/FormContext";

const inputfield = formField.inputfield.Education;
const selectfield = formField.selectfield.Education;

const Education = (props) => {
  const form = useUserForm({
    validateInputOnBlur: true,
    initialValues: { ...props.data },
    validate: {
      yearofexperience: (value) =>
        value ? null : "Experience details should be more descriptive",
      highestteachinglevel: (value) =>
        value ? null : "Please specify the highest teaching level",
      educationallevel: (value) =>
        value ? null : "Educational level is required",
      notes: (value) => (value ? null : "Required"),
      schoolcat: (value) => (value ? null : "School category is required"),
      strength: (value) => (value ? null : "Please describe your strengths"),
      occupation: (value) =>
        value
          ? value.length > 0
            ? null
            : "Occupation is required"
          : "Occupation is required",
      secondaryschool: (value) =>
        value
          ? value.length > 0
            ? null
            : "Secondary school information is required"
          : "Secondary school information is required",
      primaryschool: (value) =>
        value
          ? value.length > 0
            ? null
            : "Primary school information is required"
          : "Primary school information is required",
      publicexamgrade: (value) => {
        const number = parseInt(value, 10);
        return number >= 1 && number <= 42
          ? null
          : "Enter a valid number between 1 and 42";
      },
      university: (value) => {
        if (!value) {
          return null; // Returns null if value is undefined or null (considered valid in this case)
        } else if (/^[^\d!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?]+$/i.test(value)) {
          return null; // Checks if the value contains only letters and spaces
        } else {
          return "University information must not contain numbers or symbols";
        }
      },
      experience: (value) => (value ? null : "Please specify your experience"),
      major: (value) => {
        if (!value) {
          return null; // Returns null if value is undefined or null (considered valid in this case)
        } else if (/^[^\d!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?]+$/i.test(value)) {
          return null; // Checks if the value contains only letters and spaces
        } else {
          return "Major Name must not contain numbers or symbols";
        }
      },
      othercert: (value) =>
        value
          ? value.length <= 200
            ? null
            : "Certification details should be less than 200 characters"
          : null,
      // intro: (value) =>
      //   value
      //     ? value.length > 10
      //       ? null
      //       : "Introduction should be more descriptive"
      //     : "Introduction should be more descriptive",
    },
  });

  const submitHanlder = (event) => {
    form.setValues((prev) => ({ ...prev, ...event }));
    const NewData = { ...props.data, ...form.values };
    props.updateForm(NewData);
  };
  useEffect(() => {
    form.setValues(props.data);
    form.resetDirty(props.data);
  }, [props.data]);
  return (
    <>
      <form onSubmit={form.onSubmit((values) => submitHanlder(values))}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        </div>
        <div className="flex justify-end mt-10">
          <Button type="submit">更新</Button>
        </div>
      </form>
    </>
  );
};
export default Education;
