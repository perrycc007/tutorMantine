import { useState } from "react";
import { Tabs } from "@mantine/core";
import GradeFormOption from "./GradeFormOption";
import CAccordions from "./CAccordion";
function Grades() {
  const [activeTab, setActiveTab] = useState<string | null>("first");
  const {
    list: { HKCEE, HKALE, HKDSE, IB, IGCSE, GCEALevel, GradeBase, numberBase },
  } = GradeFormOption;

  return (
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
        />
      </Tabs.Panel>
      <Tabs.Panel value="HKALE">
        <CAccordions
          cat={HKALE}
          key="HKALE"
          childKey="HKALE"
          select={GradeBase}
        />
      </Tabs.Panel>
      <Tabs.Panel value="HKDSE">
        <CAccordions
          cat={HKDSE}
          key="HKDSE"
          childKey="HKDSE"
          select={numberBase}
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
        />
      </Tabs.Panel>
      <Tabs.Panel value="GCE A Level">
        <CAccordions
          cat={GCEALevel}
          key="GCEALevel"
          childKey="GCEALevel"
          select={GradeBase}
        />
      </Tabs.Panel>
    </Tabs>
  );
}

export default Grades;
