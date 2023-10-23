import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import Form from "./Form";
import userStore from "../../stores/stores";
import { useEffect, useState } from "react";
function EditProfileForm(props) {
  const [opened, { open, close }] = useDisclosure(false);
  const TutorProfile = userStore((state) => state.TutorProfile);
  const Profile = userStore((state) => state.Profile);
  const updateProfile = userStore((state) => state.updateProfile);
  const updateTutor = userStore((state) => state.updateTutor);

  const [profile, setProfile] = useState(null);
  const [tutorProfile, setTutorProfile] = useState(null);
  const updateTutorFormHandler = (values) => {
    updateTutor(values);
    setTutorProfile(values);
  };
  const updateFormHanlder = (value) => {
    updateProfile(value);
    setProfile(value);
  };
  const selectedHandler = () => {
    open();
    getProfile();
  };

  async function getProfile() {
    try {
      const response = await Axios.get(
        `http://localhost:3001/profile/${props.userid}`
      );
      const tutor = await Axios.get(
        `http://localhost:3001/tutor/${props.userid}`
      );
      setProfile(response.data.result);
      setTutorProfile(tutor.data.result);
      setProfile(response.data.result);
      setTutorProfile(tutor.data.result);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    let { location, subject, availtime, ...item } = props.cases;
    location = JSON.parse(location);
    subject = JSON.parse(subject);
    availtime = JSON.parse(availtime);
    const NewData = {
      ...item,
      location: location,
      subject: subject,
      availtime: availtime,
    };
    setData(NewData);
  }, []);
  return (
    <>
      <Modal
        opened={opened}
        size="auto"
        onClose={close}
        title="Authentication"
        centered
      >
        <Form
          data={profile}
          tutorData={tutorProfile}
          updateForm={updateFormHanlder}
          updateTutorForm={updateTutorFormHandler}
          type={props.type}
        ></Form>
      </Modal>
      <Button onClick={selectedHandler}>編輯</Button>
    </>
  );
}

export default EditProfileForm;
