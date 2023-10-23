import { useState, useEffect } from "react";
import { Tabs, Button } from "@mantine/core";
import GradeFormOption from "./GradeFormOption";
import CAccordions from "./CAccordion";
import { useUserForm } from "../../FormModel/FormContext";

function Grades(props) {
  const form = useUserForm();
  const [activeTab, setActiveTab] = useState("HKCEE");
  const [list, setList] = useState([{ id: "drop", value: "" }]);
  const {
    list: { HKCEE, HKALE, HKDSE, IB, IGCSE, GCEALevel, GradeBase, numberBase },
  } = GradeFormOption;

  const loadInitialValues = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), 1000);
    });
  };
  useEffect(() => {
    loadInitialValues(props.data).then((values) => {
      form.setValues(values);
      form.resetDirty(values);
      setList(values.grade);
    });
  }, []);

  const selectHandler = (id, value) => {
    const existed = (id) => {
      return list.some((item) => item.id == id);
    };
    // updating
    if (existed(id)) {
      let filtered = list
        .filter((item) => item.id !== id)
        .filter((item) => item.value !== "")
        .filter((item) => item.value !== null);
      if (value !== "") {
        setList(
          [...filtered, { id: id, value: value }].filter(
            (item) => item.value !== null
          )
        );
      } else {
        setList([...filtered].filter((item) => item.value !== null));
      }
    } else {
      // adding
      if (value !== "") {
        let newlist = [...list, { id: id, value: value }];
        // newlist = list.filter((item) => item.id !== "none");
        setList(newlist.filter((item) => item.value !== null));
      }
    }
    console.log(list);
  };
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        form.setFieldValue("grade", list);
        const NewData = { ...props.data, grade: list };
        props.updateForm(NewData);
      }}
    >
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="HKCEE">HKCEE</Tabs.Tab>
          <Tabs.Tab value="HKALE">HKALE</Tabs.Tab>
          <Tabs.Tab value="HKDSE">HKDSE</Tabs.Tab>
          <Tabs.Tab value="IB">IB</Tabs.Tab>
          <Tabs.Tab value="IGCSE">IGCSE</Tabs.Tab>
          <Tabs.Tab value="GCE A Level">IGCSE</Tabs.Tab>
        </Tabs.List>
        {/* put the CAccordion into the pannel  */}
        <Tabs.Panel value="HKCEE">
          <CAccordions
            cat={HKCEE}
            key="HKCEE"
            childKey="HKCEE"
            select={GradeBase}
            choiceHandler={selectHandler}
          />
        </Tabs.Panel>
        <Tabs.Panel value="HKALE">
          <CAccordions
            cat={HKALE}
            key="HKALE"
            childKey="HKALE"
            select={GradeBase}
            choiceHandler={selectHandler}
          />
        </Tabs.Panel>
        <Tabs.Panel value="HKDSE">
          <CAccordions
            cat={HKDSE}
            key="HKDSE"
            childKey="HKDSE"
            select={numberBase}
            choiceHandler={selectHandler}
          />
        </Tabs.Panel>
        <Tabs.Panel value="IB">
          <CAccordions cat={IB} key="IB" childKey="IB" select={GradeBase} />
        </Tabs.Panel>
        <Tabs.Panel value="IGCSE">
          <CAccordions
            cat={IGCSE}
            key="IGCSE"
            childKey="IGCSE"
            select={GradeBase}
            choiceHandler={selectHandler}
          />
        </Tabs.Panel>
        <Tabs.Panel value="GCE A Level">
          <CAccordions
            cat={GCEALevel}
            key="GCEALevel"
            childKey="GCEALevel"
            select={GradeBase}
            choiceHandler={selectHandler}
          />
        </Tabs.Panel>
      </Tabs>
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default Grades;
