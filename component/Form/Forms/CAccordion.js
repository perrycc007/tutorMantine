import { Accordion } from "@mantine/core";
import BasicSelect from "./BasicSelect";
function CAcccordion(props) {
  // See groceries data above
  const items = Object.entries(props.cat).map(([key, value]) => (
    <Accordion.Item key={`${props.childKey + key}Summary`} value={key}>
      <Accordion.Control>{key}</Accordion.Control>
      <Accordion.Panel>
        {value.map((item) => {
          return (
            <BasicSelect
              key={props.childKey + key + item}
              id={props.childKey + key + item}
              name={item}
              //   passValue={props.choiceHandler}
              select={props.select}
            ></BasicSelect>
          );
        })}
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return <Accordion>{items}</Accordion>;
}

export default CAcccordion;
