import { useState, useEffect } from "react";
import { Select } from "@mantine/core";
import { useUserForm } from "../../FormModel/FormContext";
import userStore from "../../../../stores/stores";

export default function BasicSelect(props) {
  const [value, setValue] = useState();
  const Profile = userStore((state) => state.Profile);

  const foundObject = Profile.grade.find((item) => item.id === props.id);

  useEffect(() => {
    if (foundObject) {
      setValue(foundObject.value);
    }
  }, [foundObject]);

  const handleChange = (event) => {
    setValue(event);
    props.passValue(props.id, event);
  };

  return (
    <Select
      key={props.id}
      label={props.name}
      allowDeselect
      data={props.select}
      value={value}
      clearable
      onChange={handleChange}
    />
  );
}
