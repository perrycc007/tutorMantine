import { useEffect } from "react";
import { TextInput, Select, Button } from "@mantine/core";
import formField from "../FormModel/formField";
import { useUserForm } from "../FormModel/FormContext";

const inputfield = formField.inputfield.BasicInfo;
const checkboxfield = formField.checkboxfieldfield.agreewith;
const selectfield = formField.selectfield.BasicInfo;

function loadInitialValues(): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          findus: "",
          language: "",
          name: "",
          nationality: "",
          phoneno: "1231132",
          address: "1231213",
          emergencycontact: "",
          emergencyrelationship: "",
          emergencyphone: "132456",
        }),
      2000
    );
  });
}

const BasicForm = () => {
  const form = useUserForm();
  console.log(form.values);
  // const form = useUserForm({
  //   initialValues: {
  //     findus: "",
  //     language: "",
  //     name: "",
  //     nationality: "",
  //     phoneno: "",
  //     address: "",
  //     emergencycontact: "",
  //     emergencyrelationship: "",
  //     emergencyphone: "",
  //   },
  // });
  useEffect(() => {
    loadInitialValues().then((values) => {
      form.setValues(values);
      form.resetDirty(values);
    });
  }, []);

  return (
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

export default BasicForm;
