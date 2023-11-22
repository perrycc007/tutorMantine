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

  const getuserId = userStore((state) => state.userId);
  const updateApplicationHandler = (value) => {
    props.updateStudentForm(data.studentId, { ...data, ...value });
    setData((prev) => ({
      ...prev,
      ...value,
    }));
  };

  useEffect(() => {
    let { locations, subjects, availtimes, ...item } = props.cases;
    console.log(props.cases);
    locations = locations
      ? typeof locations == "object"
        ? locations
        : locations.split(",")
      : [];

    subjects = subjects
      ? typeof subjects == "object"
        ? subjects
        : subjects.split(",")
      : [];
    availtimes = availtimes
      ? typeof availtimes == "object"
        ? availtimes
        : availtimes.split(",")
      : [];
    const NewData = {
      ...item,
      locations: locations,
      subjects: subjects,
      availtimes: availtimes,
    };
    setData(NewData);
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
        <StudentApply
          data={data}
          studentId={props.studentId}
          type="history"
          updateApplication={updateApplicationHandler}
        ></StudentApply>
      </Modal>
      <Button onClick={open}>編輯</Button>
    </>
  );
}

export default EditForm;
