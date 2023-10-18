import React, { useState } from "react";
import { RangeSlider, Button } from "@mantine/core";

function BudgetForm() {
  const [payRange, setPayRange] = useState([10, 50]);

  const handlePayRangeChange = (value) => {
    setPayRange(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Pay range: ${payRange[0]} - ${payRange[1]} per hour`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>
        工資: ${payRange[0]} - ${payRange[1]} 每小時
      </p>
      <RangeSlider
        id="pay-range"
        value={payRange}
        onChange={handlePayRangeChange}
        min={60}
        max={1000}
        step={50}
        label={(value) => `$${value}`}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default BudgetForm;
