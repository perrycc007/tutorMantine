import { Grid } from "@mantine/core";
import { useState } from "react";
import { Chip, Button } from "@mantine/core";
import datetime from "./TimeOption.js";
import { useUserForm } from "../FormModel/FormContext";

function Time() {
  const [value, setValue] = useState([""]);
  const form = useUserForm();
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        console.log(value);
        form.setFieldValue("time", value);
      }}
    >
      <Chip.Group multiple value={value} onChange={setValue}>
        <Grid>
          '
          {Object.entries(datetime).map(([key, value]) => (
            <Grid.Col span={1.5}>{key}</Grid.Col>
          ))}
        </Grid>
        <Grid>
          {Object.entries(datetime).map(([key, value]) => (
            <Grid.Col span={1.5}>
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
