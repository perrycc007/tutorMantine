import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import StudentApply from "../../component/Form/StudentApply";
import userStore from "../../stores/stores";
import { useEffect, useState } from "react";
import { updateStudentAxios } from "../../component/Helper/AxiosFunction";
import { stripFormEventProperties } from "../../component/Helper/HelperFunction";
function EditForm(props) {
  const [opened, { open, close }] = useDisclosure(false);
  const [data, setData] = useState(props.cases);
  const NewStudentApplication = userStore(
    (state) => state.NewStudentApplication
  );
  const updateNewStudentApplication = userStore(
    (state) => state.updateNewStudentApplication
  );
  const getUserid = userStore((state) => state.userId);
  const updateApplicationHandler = (value) => {
    updateNewStudentApplication(value);
    // updateStudentAxios(
    //   getUserid,
    //   stripFormEventProperties({ ...data, ...value })
    // );
    setData((prev) => ({
      ...prev,
      ...value,
    }));
  };

  useEffect(() => {
    let { locations, subjects, availtimes, ...item } = props.cases;
    locations = locations ? locations.split(",") : [];
    subjects = subjects ? subjects.split(",") : [];
    availtimes = availtimes ? availtimes.split(",") : [];
    const NewData = {
      ...item,
      locations: locations,
      subjects: subjects,
      availtimes: availtimes,
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
