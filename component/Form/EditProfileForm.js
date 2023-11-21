import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import Form from "./Form";
import { stripFormEventProperties } from "../../component/Helper/HelperFunction";
import userStore from "../../stores/stores";
import { use, useEffect, useState } from "react";
function EditProfileForm(props) {
  const [opened, { open, close }] = useDisclosure(false);
  const [profile, setProfile] = useState({});
  const [tutorProfile, setTutorProfile] = useState({});
  const updateTutorFormHandler = (values) => {
    props.updateTutorForm(props.cases.userId, stripFormEventProperties(values));
  };
  const updateFormHanlder = (values) => {
    props.updateForm(props.cases.userId, stripFormEventProperties(values));
  };
  const selectedHandler = () => {
    open();
  };

  useEffect(() => {
    if (props.type == "tutor") {
      let { locations, subjects, availTimes, profile, ...item } = props.cases;

      const NewData = {
        ...item,
        locations: locations ? locations.split(",") : [],
        subjects: subjects ? subjects.split(",") : [],
        availTimes: availTimes ? availTimes.split(",") : [],
      };
      console.log(profile);
      setProfile(profile);
      setTutorProfile(NewData);
    } else {
      console.log(props.cases);
      setProfile(props.cases);
    }
  }, [props.cases]);
  return (
    <>
      <Modal
        opened={opened}
        size="auto"
        onClose={close}
        title="Authentication"
        centered
      >
        {props.type == "student" && (
          <Form
            data={profile}
            updateForm={updateFormHanlder}
            type={props.type}
          ></Form>
        )}
        {props.type == "tutor" && (
          <Form
            data={profile}
            tutorData={tutorProfile}
            updateForm={updateFormHanlder}
            updateTutorForm={updateTutorFormHandler}
            type={props.type}
          ></Form>
        )}
      </Modal>
      <Button onClick={selectedHandler}>編輯個人檔案</Button>
    </>
  );
}

export default EditProfileForm;
