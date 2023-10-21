import { useState, useEffect } from "react";
import { Tabs, Chip, Button } from "@mantine/core";
import subjects from "./Subject";
import { useUserForm } from "../../FormModel/FormContext";
import userStore from "../../../../stores/stores";

function SubjectsForms() {
  const [activeTab, setActiveTab] = useState("補習");
  const form = useUserForm();
  const Profile = userStore((state) => state.Profile);
  const updateProfile = userStore((state) => state.updateProfile);

  const cat = Object.entries(subjects).map(([key, value]) => {
    return value;
  });
  const [value, setValue] = useState([""]);
  const loadInitialValues = (Profile) => {
    console.log("load");
    return new Promise((resolve) => {
      setTimeout(() => resolve(Profile), 1000);
    });
  };
  useEffect(() => {
    loadInitialValues(Profile).then((values) => {
      console.log(values);
      setValue(values.subjects);
      form.setValues(values);
      form.resetDirty(values);
    });
  }, []);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        console.log(value);
        form.setFieldValue("subjects", value);
        const NewProfile = { ...Profile, subjects: value };
        updateProfile(NewProfile);
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
