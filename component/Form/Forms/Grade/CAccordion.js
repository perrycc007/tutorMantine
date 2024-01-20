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
import { Accordion } from "@mantine/core";

function CAccordion({ cat, select, form }) {
  // Memoize the transformation of the `cat` data
  const memoizedCategories = useMemo(() => {
    return Object.entries(cat).map(([subjectKey, subjectName]) => ({
      subjectKey,
      subjectNameEntries: Object.entries(subjectName).map(([key, name]) => ({
        key,
        name,
      })),
    }));
  }, [cat]);

  return (
    <Accordion>
      {memoizedCategories.map(({ subjectKey, subjectNameEntries }) => (
        <Accordion.Item key={subjectKey} value={subjectKey}>
          <Accordion.Control>{subjectKey}</Accordion.Control>
          <Accordion.Panel key={subjectKey + "panel"}>
            {subjectNameEntries.map(({ key, name }) => (
              <div key={key}>
                <label htmlFor={key}>{name}</label>
                <select
                  {...form.getInputProps(key)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  id={key}
                >
                  {select.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default CAccordion;
