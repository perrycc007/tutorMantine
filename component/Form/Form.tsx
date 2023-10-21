import { useState, useEffect } from "react";
import { Stepper, Button, Group, TextInput, Code } from "@mantine/core";
import { UserFormProvider, useUserForm } from "./FormModel/FormContext";
import PersonalInfoForm from "./Forms/PersonalInfoForm";
import BudgetForm from "./Forms/BudgetForm";
import Education from "./Forms/Education";
import Grades from "./Forms/Grade/Grades";
import LocationForms from "./Forms/Location/LocationForms";
import Time from "./Forms/Time/Time";
import userStore from "../../stores/stores";
import SubjectsForms from "./Forms/Subject/SubjectForm";
function Form() {
  const [active, setActive] = useState(0);
  const Profile = userStore((state) => state.Profile);
  const updateProfile = userStore((state) => state.updateProfile);
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
      location: [],
      time: [],
    },
  });

  // useEffect(() => {
  //   loadInitialValues(Profile).then((values) => {
  //     form.setValues(Profile);
  //     form.resetDirty(values);
  //   });
  // }, []);

  const nextStep = () =>
    setActive((current) => {
      // if (form.validate().hasErrors) {
      //   return current;
      // }
      return current < 5 ? current + 1 : current;
    });

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <UserFormProvider form={form}>
        <Stepper active={active}>
          <Stepper.Step label="" description="個人資料">
            <PersonalInfoForm />
          </Stepper.Step>
          <Stepper.Step label="" description="地點">
            <LocationForms />
          </Stepper.Step>
          <Stepper.Step label="" description="時間">
            <Time />
          </Stepper.Step>
          <Stepper.Step label="" description="教育水平">
            <Education />
          </Stepper.Step>
          <Stepper.Step label="" description="薪金">
            <SubjectsForms />
          </Stepper.Step>
          <Stepper.Step label="" description="考試成績">
            <Grades />
          </Stepper.Step>
          <Stepper.Step label="" description="薪金">
            <BudgetForm />
          </Stepper.Step>
          <Stepper.Completed>完成</Stepper.Completed>
        </Stepper>

        <Group justify="flex-end" mt="xl">
          {active !== 0 && (
            <Button variant="default" onClick={prevStep}>
              返回
            </Button>
          )}
          {active !== 6 && <Button onClick={nextStep}>下一步</Button>}
        </Group>
      </UserFormProvider>
    </>
  );
}

export default Form;
