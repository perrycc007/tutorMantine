import { useState, useEffect } from "react";
import { Tabs, Chip, Button, Group, Alert } from "@mantine/core";
import subjects from "./Subject";
import { useUserForm } from "../../FormModel/FormContext";
import userStore from "../../../../stores/stores";

function SubjectsForms(props) {
  const [activeTab, setActiveTab] = useState("補習");
  const [showError, setShowError] = useState(false);
  const [value, setValue] = useState([""]);
  const form = useUserForm();

  const cat = Object.entries(subjects).map(([key, value]) => {
    return value;
  });

  const onlickHandler = (event) => {
    setValue(event);
    if (props.type == "filter") {
      props.updateForm({ subjects: event });
    }
  };

  useEffect(() => {
    setValue(props.data.subjects || []);
    form.setValues(props.data);
    form.resetDirty(props.data);
  }, [props.data]);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (Array.isArray(value) && value.length > 0) {
          form.setFieldValue("subjects", value);
          const NewData = {
            ...props.data,
            subjects: value,
          };
          props.updateForm(NewData);
          props.types == "newApplication" ? props.nextStep() : "";
          setShowError(false); // Reset error state if submission is successful
        } else {
          setShowError(true); // Show error if validation fails
        }
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
        {showError && (
          <Alert color="red" title="Error">
            Please select at least one subject.
          </Alert>
        )}
        {cat.map((subjects) => (
          <Tabs.Panel key={subjects.cat} value={subjects.cat} className="mt-4">
            <Chip.Group
              key={`${subjects.cat}` + "Chip.Group"}
              multiple
              value={value}
              onChange={onlickHandler}
            >
              <Group key={`${subjects.cat}` + "Group"} justify="center">
                {Object.entries(subjects.items).map(([key, label]) => (
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

export default SubjectsForms;
