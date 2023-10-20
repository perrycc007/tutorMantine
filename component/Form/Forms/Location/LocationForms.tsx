import { useState } from "react";
import { Tabs, Chip, Button } from "@mantine/core";
import locations from "./location.js";
import { useUserForm } from "../../FormModel/FormContext";
import userStore from "../../../../stores/stores";
function LocationForms() {
  const [activeTab, setActiveTab] = useState<string | null>("香港島");
  const form = useUserForm();
  const cat = Object.entries(locations).map(([key, value]) => {
    return value;
  });
  const Profile = userStore((state) => state.favouriteTutor);
  const [value, setValue] = useState([""]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        console.log(Profile);
        console.log(value);
        form.setFieldValue("location", value);
        console.log(form.values);
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
