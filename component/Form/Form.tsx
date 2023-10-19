import { useState, useEffect } from "react";
import { Stepper, Button, Group, TextInput, Code } from "@mantine/core";
import { UserFormProvider, useUserForm } from "./FormModel/FormContext";
import BasicForm from "./Forms/BasicForm";
import BudgetForm from "./Forms/BudgetForm";
import Education from "./Forms/Education";
import Grades from "./Forms/Grades";
function Form() {
  const [active, setActive] = useState(0);
  const form = useUserForm({
    initialValues: {
      findus: "",
      language: "",
      name: "",
      nationality: "",
      phoneno: "",
      address: "",
      emergencycontact: "",
      emergencyrelationship: "",
      emergencyphone: "",
      lowestpay: 100,
      highestpay: 200,
      yearofexperience: "",
      experience: "",
      highestteachinglevel: "",
      educationallevel: "",
      notes: "",
      schoolcat: "",
      year: "",
      strength: "",
      genderrequirement: "",
      expectation: "",
      agreewith: "",
      occupation: "",
      secondaryschool: "",
      primaryschool: "",
      publicexamgrade: "",
      university: "",
      major: "",
      othercert: "",
      others: "",
      intro: "",
      grade: [],
    },
  });

  // useEffect(() => {
  //   loadInitialValues().then((values) => {
  //     form.setValues(values);
  //     form.resetDirty(values);
  //   });
  // }, []);

  const nextStep = () =>
    setActive((current) => {
      // if (form.validate().hasErrors) {
      //   return current;
      // }
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <UserFormProvider form={form}>
        <Stepper active={active}>
          <Stepper.Step label="" description="Profile settings">
            <BasicForm />
          </Stepper.Step>

          <Stepper.Step label="" description="Personal information">
            <BudgetForm />
          </Stepper.Step>

          <Stepper.Step label="" description="Education">
            <Education />
          </Stepper.Step>
          <Stepper.Step label="" description="Personal information">
            <Grades />
          </Stepper.Step>
          <Stepper.Completed>complete</Stepper.Completed>
        </Stepper>

        <Group justify="flex-end" mt="xl">
          {active !== 0 && (
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
          )}
          {active !== 3 && <Button onClick={nextStep}>Next step</Button>}
        </Group>
      </UserFormProvider>
    </>
  );
}

export default Form;
