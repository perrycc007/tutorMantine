import { useState, useEffect } from "react";
import { Tabs, Chip, Button, Group } from "@mantine/core";
import subjects from "./Subject";
import { useUserForm } from "../../FormModel/FormContext";
import userStore from "../../../../stores/stores";

function SubjectsForms(props) {
  const [activeTab, setActiveTab] = useState("補習");
  const [value, setValue] = useState([""]);
  const form = useUserForm();

  const cat = Object.entries(subjects).map(([key, value]) => {
    return value;
  });

  const loadInitialValues = (Profile) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(Profile), 1000);
    });
  };
  useEffect(() => {
    loadInitialValues(props.data).then((values) => {
      setValue(values.subject || []);
      form.setValues(values);
      form.resetDirty(values);
    });
  }, []);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        form.setFieldValue("subject", value);
        const NewData = {
          ...props.data,
          subject: value,
        };
        props.updateForm(NewData);
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
          <Tabs.Panel key={subjects.cat} value={subjects.cat}>
            <Chip.Group
              key={`${subjects.cat}` + "Chip.Group"}
              multiple
              value={value}
              onChange={setValue}
            >
              <Group key={`${subjects.cat}` + "Group"} justify="center">
                {subjects.items.map((item) => (
                  <Chip value={item} key={item}>
                    {item}
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

export default SubjectsForms;
