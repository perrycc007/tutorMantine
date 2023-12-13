import { Grid } from "@mantine/core";
import { useState, useEffect } from "react";
import { Chip, Button, Alert, ScrollArea } from "@mantine/core";
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

  const [viewportSize, setViewportSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Function to update the state with the window size
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Call the function to set the initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

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
      {" "}
      <ScrollArea
        w={viewportSize.width > 550 ? 500 : viewportSize.width - 40}
        type={viewportSize.width > 550 ? "" : "always"}
        offsetScrollbars
      >
        <div className="w-full max-w-[500px] overflow-x-auto">
          {/* Grid for date and datetime */}
          <div className="min-w-max">
            <div className="grid grid-cols-7 gap-x-2">
              {date.map((value) => (
                <div key={value} className="col-span-1">
                  {value}
                </div>
              ))}
            </div>

            {showError && (
              <Alert color="red" title="Error">
                Please select at least one timeslot.
              </Alert>
            )}

            <div className="grid grid-cols-7 gap-x-2">
              {Object.entries(datetime).map(([key, value]) => (
                <div key={key} className="col-span-1">
                  {value.map((item) => (
                    <Chip
                      value={`${key}-${item.value}`}
                      key={`${key}${item.value}`}
                      radius="xs"
                    >
                      {item.label}
                    </Chip>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
      <Button type="submit">
        {props.types == "newApplication" ? "下一步" : "更新"}
      </Button>
    </form>
  );
}

export default Time;
