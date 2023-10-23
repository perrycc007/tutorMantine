import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import StudentApply from "../../component/Form/StudentApply";
import userStore from "../../stores/stores";
import { useEffect, useState } from "react";
function EditForm(props) {
  const [opened, { open, close }] = useDisclosure(false);
  const [data, setData] = useState(props.cases);
  const NewStudentApplication = userStore(
    (state) => state.NewStudentApplication
  );
  const updateNewStudentApplication = userStore(
    (state) => state.updateNewStudentApplication
  );
  const updateApplicationHandler = (value) => {
    updateNewStudentApplication(value);
    setData(value);
  };

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
        <StudentApply
          data={data}
          studentid={props.studentid}
          type="history"
          updateApplication={updateApplicationHandler}
        ></StudentApply>
      </Modal>
      <Button onClick={open}>編輯</Button>
    </>
  );
}

export default EditForm;
