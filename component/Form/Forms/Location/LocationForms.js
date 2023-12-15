import { useState, useEffect } from "react";
import { Tabs, Chip, Button, Group, Alert } from "@mantine/core";
import locations from "./location.js";
import { useUserForm } from "../../FormModel/FormContext";

function LocationForms(props) {
  const [activeTab, setActiveTab] = useState("香港島");
  const [showError, setShowError] = useState(false);

  const form = useUserForm({});

  // Ensure the initial state is an array to support multiple selections.
  const [value, setValue] = useState([""]);

  const cat = Object.entries(locations).map(([key, value]) => value);
  const onlickHandler = (event) => {
    setValue(event);
    if (props.type == "filter") {
      props.updateForm({ locations: event });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (Array.isArray(value) && value.length > 0) {
      form.setFieldValue("locations", value);
      const NewData = { ...props.data, locations: value };
      props.updateForm(NewData);
      props.types == "newApplication" ? props.nextStep() : "";
      setShowError(false); // Reset error state if submission is successful
    } else {
      setShowError(true); // Show error if validation fails
    }
  };
  useEffect(() => {
    setValue(props.data.locations || [null]);
    form.setValues(props.data);
    form.resetDirty(props.data);
  }, [props.data]);

  return (
    <form
      onSubmit={(event) => {
        handleSubmit(event);
      }}
    >
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          {cat.map((location) => (
            <Tabs.Tab key={location.cat} value={location.cat}>
              {location.cat}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {showError && (
          <Alert color="red" title="Error">
            Please select at least one location.
          </Alert>
        )}

        {cat.map((location) => (
          <Tabs.Panel key={location.cat} value={location.cat} className="mt-4">
            <Chip.Group
              multiple={true}
              value={value}
              onChange={onlickHandler}
              key={`${location.cat}` + "Chip.Group"}
            >
              <Group key={`${location.cat}` + "Group"} justify="center">
                {Object.entries(location.items).map(([key, label]) => (
                  <Chip value={label} key={key}>
                    {label}
                  </Chip>
                ))}
              </Group>
            </Chip.Group>
          </Tabs.Panel>
        ))}
      </Tabs>
      <div className="flex justify-end mt-10">
        {props.type == "filter" ? (
          ""
        ) : (
          <button type="submit">
            {props.types == "newApplication" ? "下一步" : "更新"}
          </button>
        )}
      </div>
    </form>
  );
}

export default LocationForms;
