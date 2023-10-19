import React, { useState, useEffect } from "react";
import { RangeSlider, Button, TextInput } from "@mantine/core";
import { UserFormProvider, useUserForm } from "../FormModel/FormContext";

function BudgetForm() {
  const [payRange, setPayRange] = useState([100, 200]);
  const form = useUserForm();
  const handlePayRangeChange = (value) => {
    setPayRange(value);
  };
  // useEffect(() => {
  //   setPayRange([lowestpay, highestpay]);
  // }, []);

  return (
    <UserFormProvider form={form}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          form.setFieldValue("lowestpay", payRange[0]);
          form.setFieldValue("highestpay", payRange[1]);
          console.log(`Pay range: ${payRange[0]} - ${payRange[1]} per hour`);
        }}
      >
        <p>
          工資: ${payRange[0]} - ${payRange[1]} 每小時
        </p>
        <TextInput value={payRange[0]}></TextInput>
        <TextInput value={payRange[1]}></TextInput>
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
    </UserFormProvider>
  );
}

export default BudgetForm;
