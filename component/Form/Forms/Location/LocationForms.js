import { useState, useEffect } from "react";
import { Tabs, Chip, Button, Group } from "@mantine/core";
import locations from "./location.js";
import { useUserForm } from "../../FormModel/FormContext";

function LocationForms(props) {
  const [activeTab, setActiveTab] = useState("香港島");
  const form = useUserForm();

  // Ensure the initial state is an array to support multiple selections.
  const [value, setValue] = useState([""]);

  const cat = Object.entries(locations).map(([key, value]) => value);

  const loadInitialValues = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), 1000);
    });
  };

  useEffect(() => {
    loadInitialValues(props.data).then((values) => {
      // Assuming 'values.location' is an array of selected locations
      console.log(values.location);
      setValue(values.location || [null]);
      form.setValues(values);
      form.resetDirty(values);
    });
  }, [props.data]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        form.setFieldValue("location", value);
        const NewData = { ...props.data, location: value };
        props.updateForm(NewData);
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

        {cat.map((location) => (
          <Tabs.Panel key={location.cat} value={location.cat}>
            <Chip.Group
              multiple={true}
              value={value}
              onChange={setValue}
              key={`${location.cat}` + "Chip.Group"}
            >
              <Group key={`${location.cat}` + "Group"} justify="center">
                {Object.entries(location.items).map(([key, label]) => (
                  <Chip value={key} key={key}>
                    {label}
                  </Chip>
                ))}
              </Group>
            </Chip.Group>
          </Tabs.Panel>
        ))}
      </Tabs>
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default LocationForms;
