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
    if (props.type == "tutor") {
      props.passIndex(props.index);
    } else if (props.type == "student") {
      props.passIndex(-1);
    }
  };

  useEffect(() => {
    if (props.type == "tutor") {
      let { locations, subjects, availtimes, profile, ...item } = props.cases;
      const NewData = {
        ...item,
        locations: locations
          ? typeof locations == "object"
            ? locations
            : locations.split(",")
          : [],

        subjects: subjects
          ? typeof subjects == "object"
            ? subjects
            : subjects.split(",")
          : [],
        availtimes: availtimes
          ? typeof availtimes == "object"
            ? availtimes
            : availtimes.split(",")
          : [],
      };
      setProfile(profile);
      setTutorProfile(NewData);
    } else {
      setProfile(props.cases);
    }
  }, [props.cases]);
  return (
    <>
      <Modal opened={opened} size="auto" onClose={close} centered>
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
      <button onClick={selectedHandler}>編輯個人檔案</button>
    </>
  );
}

export default EditProfileForm;
