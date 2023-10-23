import { Grid } from "@mantine/core";
import { useState, useEffect } from "react";
import { Chip, Button } from "@mantine/core";
import datetime from "./TimeOption.js";
import { useUserForm } from "../../FormModel/FormContext";
import userStore from "../../../../stores/stores"; // import { loadInitialValues } from "./FormModel/FormModel";
function Time(props) {
  const [value, setValue] = useState([""]);
  const form = useUserForm();
  const loadInitialValues = (data) => {
    console.log("load");
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), 1000);
    });
  };
  useEffect(() => {
    loadInitialValues(props.data).then((values) => {
      setValue(values.time);
      form.setValues(values);
      form.resetDirty(values);
    });
  }, []);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        form.setFieldValue("time", value);
        const NewData = { ...props.data, time: value };
        props.updateForm(NewData);
      }}
    >
      <Chip.Group multiple value={value} onChange={setValue}>
        <Grid>
          '
          {Object.entries(datetime).map(([key, value]) => (
            <Grid.Col key={key} span={1.5}>
              {key}
            </Grid.Col>
          ))}
        </Grid>
        <Grid>
          {Object.entries(datetime).map(([key, value]) => (
            <Grid.Col key={key} span={1.5}>
              {value.map((item) => (
                <Chip
                  value={`${key}` + `${item.value}`}
                  key={`${key}` + `${item.value}`}
                  radius="xs"
                >
                  {item.label}
                </Chip>
              ))}
            </Grid.Col>
          ))}
        </Grid>
      </Chip.Group>
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default Time;
