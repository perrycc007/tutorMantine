import { Accordion } from "@mantine/core";
import { Select } from "@mantine/core";
import GradeFormOption from "./GradeFormOption";
function CAcccordion(props) {
  // See groceries data above
  const {
    list: { HKDSE, numberBase },
  } = GradeFormOption;
  const items = Object.entries(HKDSE).map(([key, value]) => (
    <Accordion.Item key={`HKDSE Summary`} value={key}>
      <Accordion.Control>{key}</Accordion.Control>
      <Accordion.Panel>
        {value.map((item) => {
          return (
            <Select
              key={"hkdse" + item}
              label={item}
              {...form.getInputProps("hkdse" + item)}
              data={numberBase}
            ></Select>
          );
        })}
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return <Accordion>{items}</Accordion>;
}

export default CAcccordion;
