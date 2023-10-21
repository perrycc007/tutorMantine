import { useEffect, useState } from "react";
import { TextInput, Select, Button } from "@mantine/core";
import formField from "../FormModel/formField";
import { useUserForm } from "../FormModel/FormContext";
import userStore from "../../../stores/stores";
const inputfield = formField.inputfield.BasicInfo;
const checkboxfield = formField.checkboxfieldfield.agreewith;
const selectfield = formField.selectfield.BasicInfo;

const PersonalInfoForm = () => {
  const form = useUserForm();
  const Profile = userStore((state) => state.Profile);
  const updateProfile = userStore((state) => state.updateProfile);
  const [value, setValue] = useState(Profile);

  const loadInitialValues = (Profile) => {
    console.log("load");
    return new Promise((resolve) => {
      setTimeout(() => resolve(Profile), 1000);
    });
  };
  useEffect(() => {
    loadInitialValues(Profile).then((values) => {
      form.setValues(values);
      form.resetDirty(values);
    });
  }, []);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        form.setValues((prev) => ({ ...prev, ...event }));
        const NewProfile = { ...Profile, ...form.values };
        updateProfile(NewProfile);
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
