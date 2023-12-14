import { useState, useEffect } from "react";
import { Stepper, Button, Group, TextInput, Code } from "@mantine/core";
import { UserFormProvider, useUserForm } from "./FormModel/FormContext";
import LocationForms from "./Forms/Location/LocationForms";
import Time from "./Forms/Time/Time";
import StudentOthers from "./Forms/StudentOthers";
import SubjectsForms from "./Forms/Subject/SubjectsForms";
import userStore from "../../stores/stores";
function StudentApply(props) {
  const [active, setActive] = useState(0);

  const form = useUserForm({
    initialValues: {
      genderrequirement: "",
      expectation: "",
      lowestpay: 100,
      highestpay: 200,
      lowestduration: 60,
      highestduration: 120,
      lowestfrequency: 2,
      highestfrequency: 4,
      others: "",
      agreewith: "",
      locations: [],
      availtimes: [],
      subjects: [],
    },
  });

  useEffect(() => {
    if (props.type == "history") {
      // props.updateApplication(props.data);
      form.setValues(props.data);
      form.resetDirty(props.data);
    }
  }, [props.data]);

  const nextStep = () =>
    setActive((current) => {
      // if (form.validate().hasErrors) {
      //   return current;
      // }
      return current < 4 ? current + 1 : current;
    });

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const updateApplicationHandler = (values) => {
    props.updateApplication(values);
  };

  const handInHanlder = (values) => {
    props.type == "newApplication" && props.handIn(values);
  };

  const css =
    props.type == "history"
      ? "w-full px-4 "
      : "w-full px-4 py-8 bg-white rounded-lg shadow-md sm:px-20 w-10/12 lg:px-20 w-12/12";
  return (
    <div className="flex justify-center mt-8 md:px-8 2xl:px-4 max-w-7xl mx-auto ">
      <div className={css}>
        <UserFormProvider form={form}>
          <Stepper
            iconSize={32}
            size="sm"
            active={active}
            onStepClick={props.type == "history" ? setActive : ""}
          >
            <Stepper.Step label="" description="地點">
              <LocationForms
                data={props.data}
                updateForm={updateApplicationHandler}
                types={props.type}
                nextStep={nextStep}
              />
            </Stepper.Step>
            <Stepper.Step label="" description="時間">
              <Time
                data={props.data}
                updateForm={updateApplicationHandler}
                types={props.type}
                nextStep={nextStep}
              />
            </Stepper.Step>
            <Stepper.Step label="" description="科目">
              <SubjectsForms
                data={props.data}
                updateForm={updateApplicationHandler}
                types={props.type}
                nextStep={nextStep}
              />
            </Stepper.Step>
            <Stepper.Step label="" description="要求">
              <StudentOthers
                data={props.data}
                updateForm={
                  props.type ? handInHanlder : updateApplicationHandler
                }
                types={props.type}
              />
            </Stepper.Step>
          </Stepper>

          <Group justify="flex-end" mt="xl">
            {active !== 0 && (
              <button variant="default" onClick={prevStep}>
                返回
              </button>
            )}
            {active !== 3 && props.type !== "newApplication" && (
              <button onClick={nextStep}>下一步</button>
            )}
          </Group>
        </UserFormProvider>
      </div>
    </div>
  );
}

export default StudentApply;
