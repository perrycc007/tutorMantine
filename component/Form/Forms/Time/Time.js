import { Grid } from "@mantine/core";
import { useState, useEffect } from "react";
import { Chip, Button, Alert } from "@mantine/core";
import dateAndTime from "./TimeOption.js";
import { useUserForm } from "../../FormModel/FormContext";
import userStore from "../../../../stores/stores"; // import { loadInitialValues } from "./FormModel/FormModel";
function Time(props) {
  const [value, setValue] = useState([""]);
  const [showError, setShowError] = useState(false);
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
      className="mt-4 flex flex-col justify-center items-center w-150 min-w-150"
      onSubmit={(event) => {
        event.preventDefault();
        if (Array.isArray(value) && value.length > 0) {
          form.setFieldValue("availtimes", value);
          const NewData = { ...props.data, availtimes: value };
          props.updateForm(NewData);
          props.types == "newApplication" ? props.nextStep() : "";
          setShowError(false); // Reset error state if submission is successful
        } else {
          setShowError(true); // Show error if validation fails
        }
      }}
    >
      <div className="">
        <Chip.Group multiple value={value} onChange={setValue}>
          <Grid columns={7}>
            {date.map((value) => (
              <Grid.Col key={value} span={1}>
                {value}
              </Grid.Col>
            ))}
          </Grid>
          {showError && (
            <Alert color="red" title="Error">
              Please select at least one timeslot.
            </Alert>
          )}
          <Grid columns={7}>
            {Object.entries(datetime).map(([key, value]) => (
              <Grid.Col key={key} span={1}>
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
        <Button type="submit">
          {props.types == "newApplication" ? "下一步" : "更新"}
        </Button>
      </div>
    </form>
  );
}

export default Time;
