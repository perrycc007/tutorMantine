import React, { useEffect, useState } from "react";
import { Button, Group } from "@mantine/core";

const AdminIdNavigation = (props) => {
  const totals = 100; // Total number of s
  const PerPAge = 10; // Number of s per page
  //   const Ids = Array.from({ length: totals }, (_, i) => i + 1); // Generate  IDs (1-100)
  const Ids = props.listIds;

  const [currentPage, setCurrentPage] = useState(0);

  const startIndex = currentPage * PerPAge;
  const endIndex = startIndex + PerPAge;
  const currentIds = Ids.slice(startIndex, endIndex);

  const onClickHandler = (id) => {
    console.log(id);
    props.passId(id);
  };

  const handlePreviousClick = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextClick = () => {
    setCurrentPage((prev) =>
      prev < Math.ceil(totals / PerPAge) - 1 ? prev + 1 : prev
    );
  };
  useEffect(() => {}, [Ids]);
  return (
    <div>
      <Group>
        <Button onClick={handlePreviousClick} disabled={currentPage === 0}>
          ← Previous
        </Button>
        {currentIds.map((id) => (
          <Button key={id} value={id} onClick={() => onClickHandler(id)}>
            {id}
          </Button>
        ))}
      </Group>
      <Group position="center" mt="md">
        <Button
          onClick={handleNextClick}
          disabled={currentPage >= Math.ceil(totals / PerPAge) - 1}
        >
          Next →
        </Button>
      </Group>
    </div>
  );
};

export default AdminIdNavigation;