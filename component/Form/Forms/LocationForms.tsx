import { useState } from "react";
import { Tabs, Chip } from "@mantine/core";
import locations from "./location.js";

function LocationForms() {
  const [activeTab, setActiveTab] = useState<string | null>("first");
  const cat = Object.entries(locations).map(([key, value]) => {
    return value;
  });
  const [value, setValue] = useState(["react"]);

  return (
    <Tabs value={activeTab} onChange={setActiveTab}>
      <Tabs.List>
        {cat.map((location) => (
          <Tabs.Tab value={location.cat}>{location.cat}</Tabs.Tab>
        ))}
      </Tabs.List>
      {cat.map((location) => (
        <Tabs.Panel value={location.cat}>
          <Chip.Group multiple value={value} onChange={setValue}>
            {location.items.map((item) => (
              <Chip value={item}>{item}</Chip>
            ))}
          </Chip.Group>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}

export default LocationForms;
