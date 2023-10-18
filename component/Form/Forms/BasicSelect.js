import { useState } from "react";
import { Select } from "@mantine/core";

export default function BasicSelect(props) {
  const [value, setValue] = useState();
  const handleChange = (event) => {
    setValue(event.target.value);
    // props.passValue(props.id, event.target.value);
  };

  return (
    <Select
      label={props.name}
      allowDeselect
      data={props.select}
      value={value}
      // {...form.getInputProps(props.name)}
      onChange={handleChange}
    />
  );
}
