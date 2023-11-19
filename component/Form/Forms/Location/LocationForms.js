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

  const onlickHandler = (event) => {
    setValue(event);
    if (props.type == "filter") {
      props.updateForm({ locations: event });
    }
  };

  useEffect(() => {
    loadInitialValues(props.data).then((values) => {
      console.log(values);
      setValue(values.locations || [null]);
      form.setValues(values);
      form.resetDirty(values);
    });
  }, [props.data]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        form.setFieldValue("locations", value);
        const NewData = { ...props.data, locations: value };
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
      {props.type == "filter" ? "" : <Button type="submit">更新</Button>}
    </form>
  );
}

export default LocationForms;
