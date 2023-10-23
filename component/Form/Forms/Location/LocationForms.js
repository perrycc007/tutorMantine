import { useState, useEffect } from "react";
import { Tabs, Chip, Button } from "@mantine/core";
import locations from "./location.js";
import { useUserForm } from "../../FormModel/FormContext";
import userStore from "../../../../stores/stores.js";
function LocationForms(props) {
  const [activeTab, setActiveTab] = useState("香港島");
  // const [activeTab, setActiveTab] = useState<string | null>("香港島");

  const form = useUserForm();
  const [value, setValue] = useState([""]);
  const cat = Object.entries(locations).map(([key, value]) => {
    return value;
  });
  const loadInitialValues = (data) => {
    console.log("load");
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), 1000);
    });
  };
  useEffect(() => {
    loadInitialValues(props.data).then((values) => {
      setValue(values.location);
      form.setValues(values);
      form.resetDirty(values);
    });
  }, []);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        form.setFieldValue("location", value);
        const NewData = { ...props.data, ...form.values };
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
              multiple
              key={`${location.cat}` + "ChipGroup"}
              value={value}
              onChange={setValue}
            >
              {location.items.map((item) => (
                <Chip value={item} key={item}>
                  {item}
                </Chip>
              ))}
            </Chip.Group>
          </Tabs.Panel>
        ))}
      </Tabs>
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default LocationForms;
