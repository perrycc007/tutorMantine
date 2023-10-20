import { useState } from "react";
import { Tabs, Chip, Button } from "@mantine/core";
import subjects from "./Subject";
import { useUserForm } from "../../FormModel/FormContext.jsx";

function SubjectsForms() {
  const [activeTab, setActiveTab] = useState<string | null>("香港島");
  const form = useUserForm();
  const cat = Object.entries(subjects).map(([key, value]) => {
    return value;
  });
  const [value, setValue] = useState([""]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        console.log(value);
        form.setFieldValue("subjects", value);
      }}
    >
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          {cat.map((subjects) => (
            <Tabs.Tab key={subjects.cat} value={subjects.cat}>
              {subjects.cat}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {cat.map((subjects) => (
          <Tabs.Panel value={subjects.cat}>
            <Chip.Group multiple value={value} onChange={setValue}>
              {subjects.items.map((item) => (
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

export default SubjectsForms;
