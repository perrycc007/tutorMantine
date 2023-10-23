import React, { useState, useEffect } from "react";
import { RangeSlider, Button, TextInput } from "@mantine/core";
import { UserFormProvider, useUserForm } from "../FormModel/FormContext";
import userStore from "../../../stores/stores";

function BudgetForm(props) {
  const [payRange, setPayRange] = useState([100, 200]);
  const form = useUserForm();
  const loadInitialValues = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), 1000);
    });
  };
  useEffect(() => {
    loadInitialValues(props.data).then((values) => {
      form.setValues(values);
      form.resetDirty(values);
      setPayRange([values.lowestpay, values.highestpay]);
    });
  }, []);

  return (
    <UserFormProvider form={form}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          form.setFieldValue("lowestpay", payRange[0]);
          form.setFieldValue("highestpay", payRange[1]);
          const NewData = {
            ...props.data,
            lowestpay: payRange[0],
            highestpay: payRange[1],
          };
          props.updateForm(NewData);
        }}
      >
        <p>
          工資: ${payRange[0]} - ${payRange[1]} 每小時
        </p>
        <RangeSlider
          id="pay-range"
          value={payRange}
          onChange={(newValue) => setPayRange(newValue)}
          min={60}
          max={1000}
          step={10}
          label={(value) => `$${value}`}
        />
        <Button type="submit">Submit</Button>
      </form>
    </UserFormProvider>
  );
}

export default BudgetForm;
