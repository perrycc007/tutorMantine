import { Accordion } from "@mantine/core";
import { Select } from "@mantine/core";
function CAcccordion(props) {
  // See groceries data above
  const items = Object.entries(props.cat).map(([key, value]) => (
    <Accordion.Item
      key={`${props.childKey + key}Summary`}
      value={`${props.childKey + key}`}
    >
      <Accordion.Control>{`${key}`}</Accordion.Control>
      <Accordion.Panel>
        {Object.entries(value).map(([key, value]) => {
          return (
            <Select
              key={key}
              label={value}
              {...props.form.getInputProps(key)}
              data={props.select}
            ></Select>
          );
        })}
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return <Accordion>{items}</Accordion>;
}

export default CAcccordion;
