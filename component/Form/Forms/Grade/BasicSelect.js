import { useState } from "react";
import { Select } from "@mantine/core";
import { useUserForm } from "../../FormModel/FormContext";

export default function BasicSelect(props) {
  const [value, setValue] = useState();

  const handleChange = (event) => {
    setValue(event);
    console.log(props.id, event);
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
