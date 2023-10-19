import { useState } from "react";
import { Tabs, Chip, Button } from "@mantine/core";
import locations from "./location.js";
import { useUserForm } from "../FormModel/FormContext";

function LocationForms() {
  const [activeTab, setActiveTab] = useState<string | null>("香港島");
  const form = useUserForm();
  const cat = Object.entries(locations).map(([key, value]) => {
    return value;
  });
  const [value, setValue] = useState([""]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        console.log(value);
        form.setFieldValue("location", value);
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
          <Tabs.Panel value={location.cat}>
            <Chip.Group multiple value={value} onChange={setValue}>
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
