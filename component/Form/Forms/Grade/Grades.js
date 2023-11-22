import { useState, useEffect } from "react";
import { Tabs, Button } from "@mantine/core";
import CAccordions from "./CAccordion";
import { useUserForm } from "../../FormModel/FormContext";
import GradeFormOption from "./GradeFormOption";

function Grades(props) {
  const form = useUserForm();
  const [activeTab, setActiveTab] = useState("HKCEE");
  useEffect(() => {
    // Load initial values from props and set them in the form
    if (props.data) {
      form.setValues(props.data.subjectGrade);
      form.resetDirty(props.data.subjectGrade);
    }
  }, [props.data]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newData = { ...props.data, subjectGrade: form.values };
    props.updateForm(newData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          {/* Dynamically generate tabs from GradeFormOption */}
          {Object.keys(GradeFormOption.list).map((examType) => (
            <Tabs.Tab key={examType} value={examType}>
              {examType}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {/* Dynamically generate tab panels from GradeFormOption */}
        {Object.entries(GradeFormOption.list).map(([examType, areas]) => (
          <Tabs.Panel key={examType} value={examType}>
            <CAccordions
              cat={areas}
              select={
                examType === "HKDSE"
                  ? GradeFormOption.grade.numberBase
                  : GradeFormOption.grade.GradeBase
              }
              form={form}
            />
          </Tabs.Panel>
        ))}
      </Tabs>
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default Grades;
