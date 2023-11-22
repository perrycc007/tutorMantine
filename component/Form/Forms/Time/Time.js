import { Grid } from "@mantine/core";
import { useState, useEffect } from "react";
import { Chip, Button } from "@mantine/core";
import dateAndTime from "./TimeOption.js";
import { useUserForm } from "../../FormModel/FormContext";
import userStore from "../../../../stores/stores"; // import { loadInitialValues } from "./FormModel/FormModel";
function Time(props) {
  const [value, setValue] = useState([""]);
  const form = useUserForm();
  useEffect(() => {
    setValue(props.data.availtimes || []);
    form.setValues(props.data);
    form.resetDirty(props.data);
  }, [props.data]);

  const datetime = dateAndTime[0];
  const date = dateAndTime[1];
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        form.setFieldValue("availtimes", value);
        const NewData = { ...props.data, availtimes: value };
        props.updateForm(NewData);
      }}
    >
      <Chip.Group multiple value={value} onChange={setValue}>
        <Grid>
          {date.map((value) => (
            <Grid.Col key={value} span={1.5}>
              {value}
            </Grid.Col>
          ))}
        </Grid>
        <Grid>
          {Object.entries(datetime).map(([key, value]) => (
            <Grid.Col key={key} span={1.5}>
              {value.map((item) => (
                <Chip
                  value={`${key}` + "-" + `${item.value}`}
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
