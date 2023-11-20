import { Accordion, Select } from "@mantine/core";

function CAccordion({ cat, select, form }) {
  return (
    <Accordion>
      {Object.entries(cat).map(([subjectKey, subjectName]) => (
        <Accordion.Item key={subjectKey} value={subjectKey}>
          <Accordion.Control>{subjectKey}</Accordion.Control>
          <Accordion.Panel>
            {Object.entries(subjectName).map(([key, name]) => (
              <Select label={name} {...form.getInputProps(key)} data={select} />
            ))}
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default CAccordion;
