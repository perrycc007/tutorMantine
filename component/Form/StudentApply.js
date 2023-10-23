import { useState, useEffect } from "react";
import { Stepper, Button, Group, TextInput, Code } from "@mantine/core";
import { UserFormProvider, useUserForm } from "./FormModel/FormContext";
import LocationForms from "./Forms/Location/LocationForms";
import Time from "./Forms/Time/Time";
import StudentOthers from "./Forms/StudentOthers";
import SubjectsForms from "./Forms/Subject/SubjectForm";
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
      location: [],
      time: [],
    },
  });

  useEffect(() => {
    if (props.type == "history") {
      console.log("props.data", props.data);
      props.updateApplication(props.data);
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

  return (
    <>
      <UserFormProvider form={form}>
        <Stepper active={active}>
          <Stepper.Step label="" description="地點">
            <LocationForms
              data={props.data}
              updateForm={props.updateApplication}
            />
          </Stepper.Step>
          <Stepper.Step label="" description="時間">
            <Time data={props.data} updateForm={props.updateApplication} />
          </Stepper.Step>
          <Stepper.Step label="" description="科目">
            <SubjectsForms
              data={props.data}
              updateForm={props.updateApplication}
            />
          </Stepper.Step>
          <Stepper.Step label="" description="要求">
            <StudentOthers
              data={props.data}
              updateForm={props.updateApplication}
            />
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

export default StudentApply;
