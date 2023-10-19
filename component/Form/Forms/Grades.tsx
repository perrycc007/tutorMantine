import { useState } from "react";
import { Tabs, Button } from "@mantine/core";
import GradeFormOption from "./GradeFormOption";
import CAccordions from "./CAccordion";
import { useUserForm } from "../FormModel/FormContext";

function Grades() {
  const form = useUserForm();
  const [activeTab, setActiveTab] = useState<string | null>("HKCEE");
  const [list, setList] = useState([{ id: "", value: "" }]);
  const {
    list: { HKCEE, HKALE, HKDSE, IB, IGCSE, GCEALevel, GradeBase, numberBase },
  } = GradeFormOption;
  const selectHandler = (id: any, value: string) => {
    const existed = (id: any) => {
      return list.some((item) => item.id === id);
    };
    console.log(existed(id));
    // updating
    if (existed(id)) {
      const filtered = list
        .filter((item) => item.id !== id)
        .filter((item) => item.value !== "");
      if (value !== "") {
        setList([...filtered, { id: id, value: value }]);
      } else {
        setList([...filtered]);
      }
    } else {
      // adding
      if (value !== "") {
        const newlist = [...list, { id: id, value: value }];
        setList(newlist);
      }
    }
  };
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        console.log(list);
        form.setFieldValue("grade", list);
        console.log(form.values);
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
