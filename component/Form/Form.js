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
import SubjectsForms from "./Forms/Subject/SubjectsForms";
function Form(props) {
  const [active, setActive] = useState(0);
  const [profile, setProfile] = useState({});
  const [tutor, setTutor] = useState({});

  const updateFormHanlder = (values) => {
    form.setValues(values);
    props.updateForm(values);
  };
  const updateTutorHanlder = (values) => {
    form.setValues(values);
    props.updateTutorForm(values);
  };
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
      lowestfee: 100,
      highestfee: 200,
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
      locations: [],
      availtimes: [],
      subjects: [],
      subjectGrade: {},
    },
  });

  const nextStep = () =>
    setActive((current) => {
      // if (form.validate().hasErrors) {
      //   return current;
      // }
      if (props.type == "tutor") {
        return current < 6 ? current + 1 : current;
      }
      if (props.type == "cases") {
        return 7;
      }
    });

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  useEffect(() => {
    setProfile(props.data);
    setTutor(props.tutorData);
  }, [props.data]);
  return (
    <div className="max-w-3xl">
      <UserFormProvider form={form}>
        <Stepper
          active={active}
          onStepClick={setActive}
          size="md"
          iconPosition="right"
          iconSize={25}
          className="mt-2"
        >
          <Stepper.Step label="" description="個人資料">
            <PersonalInfoForm updateForm={updateFormHanlder} data={profile} />
          </Stepper.Step>
          {props.type == "tutor" && (
            <Stepper.Step label="" description="地點">
              <LocationForms updateForm={updateTutorHanlder} data={tutor} />
            </Stepper.Step>
          )}
          {props.type == "tutor" && (
            <Stepper.Step label="" description="時間">
              <Time updateForm={updateTutorHanlder} data={tutor} />
            </Stepper.Step>
          )}
          {props.type == "tutor" && (
            <Stepper.Step label="" description="教育水平">
              <Education updateForm={updateTutorHanlder} data={tutor} />
            </Stepper.Step>
          )}
          {props.type == "tutor" && (
            <Stepper.Step label="" description="科目">
              <SubjectsForms updateForm={updateTutorHanlder} data={tutor} />
            </Stepper.Step>
          )}
          {props.type == "tutor" && (
            <Stepper.Step label="" description="考試成績">
              <Grades updateForm={updateTutorHanlder} data={tutor} />
            </Stepper.Step>
          )}
          {props.type == "tutor" && (
            <Stepper.Step label="" description="薪金">
              <BudgetForm updateForm={updateTutorHanlder} data={tutor} />
            </Stepper.Step>
          )}
          <Stepper.Completed>完成</Stepper.Completed>
        </Stepper>

        <Group justify="flex-end" mt="xl">
          {active !== 0 && (
            <button variant="default" onClick={prevStep}>
              返回
            </button>
          )}
          {active !== 6 && props.type == "tutor" && (
            <button onClick={nextStep}>下一步</button>
          )}
        </Group>
      </UserFormProvider>
    </div>
  );
}

export default Form;
