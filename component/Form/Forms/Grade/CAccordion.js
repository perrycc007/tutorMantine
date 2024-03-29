// import { Accordion, Select } from "@mantine/core";

// function CAccordion({ cat, select, form }) {
//   return (
//     <Accordion>
//       {Object.entries(cat).map(([subjectKey, subjectName]) => (
//         <Accordion.Item key={subjectKey} value={subjectKey}>
//           <Accordion.Control>{subjectKey}</Accordion.Control>
//           <Accordion.Panel key={subjectKey + "panel"}>
//             {Object.entries(subjectName).map(([key, name]) => (
//               <Select
//                 label={name}
//                 key={key}
//                 {...form.getInputProps(key)}
//                 data={select}
//               />
//               // <p>{select}</p>
//             ))}
//           </Accordion.Panel>
//         </Accordion.Item>
//       ))}
//     </Accordion>
//   );
// }

// export default CAccordion;
import { useMemo } from "react";
import { Accordion, Select } from "@mantine/core";

function CAccordion({ cat, select, form }) {
  // Memoize the transformation of the `cat` data
  const memoizedCategories = useMemo(() => {
    return Object.entries(cat).map(([subjectKey, subjectName]) => {
      return {
        subjectKey,
        subjectNameEntries: Object.entries(subjectName).map(([key, name]) => ({
          key,
          name,
        })),
      };
    });
  }, [cat]);

  return (
    <Accordion>
      {memoizedCategories.map(({ subjectKey, subjectNameEntries }) => (
        <Accordion.Item key={subjectKey} value={subjectKey}>
          <Accordion.Control>{subjectKey}</Accordion.Control>
          <Accordion.Panel key={subjectKey + "panel"}>
            {subjectNameEntries.map(({ key, name }) => (
              <Select
                label={name}
                key={key}
                {...form.getInputProps(key)}
                data={select}
              />
            ))}
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default CAccordion;
