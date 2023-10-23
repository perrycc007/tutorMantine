import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import StudentApply from "../../component/Form/StudentApply";
import userStore from "../../stores/stores";
function EditForm(props) {
  const [opened, { open, close }] = useDisclosure(false);
  const NewStudentApplication = userStore(
    (state) => state.NewStudentApplication
  );
  const updateNewStudentApplication = userStore(
    (state) => state.updateNewStudentApplication
  );
  const updateApplicationHandler = (value) => {
    updateNewStudentApplication(value);
  };

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
          data={props.cases}
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
