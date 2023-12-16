import React, { useEffect, useState } from "react";
import { Button, Group } from "@mantine/core";

const AdminIdNavigation = (props) => {
  const totals = 100; // Total number of s
  const PerPAge = 10; // Number of s per page
  //   const Ids = Array.from({ length: totals }, (_, i) => i + 1); // Generate  IDs (1-100)
  const Ids = props.listIds ? props.listIds : [];

  const [currentPage, setCurrentPage] = useState(0);

  const startIndex = currentPage * PerPAge;
  const endIndex = startIndex + PerPAge;
  const currentIds = Ids.slice(startIndex, endIndex);

  const onClickHandler = (id) => {
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
    <div className="flex justify-center">
      <Group position="center" mt="md">
        <button onClick={handlePreviousClick} disabled={currentPage === 0}>
          ←
        </button>
        {currentIds.map((id) => (
          <button key={id} value={id} onClick={() => onClickHandler(id)}>
            {id}
          </button>
        ))}
        <button
          onClick={handleNextClick}
          disabled={currentPage >= Math.ceil(totals / PerPAge) - 1}
        >
          →
        </button>
      </Group>
    </div>
  );
};

export default AdminIdNavigation;
