import React, { useState, useEffect } from "react";
import { RangeSlider, Button, TextInput } from "@mantine/core";
import { UserFormProvider, useUserForm } from "../FormModel/FormContext";

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
      if (values.lowestfee && values.highestfee) {
        form.setValues(values);
        form.resetDirty(values);
        setPayRange([values.lowestfee, values.highestfee]);
      } else {
        setPayRange([100, 200]);
      }
    });
  }, [props.data]);

  return (
    <UserFormProvider form={form}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          form.setFieldValue("lowestfee", payRange[0]);
          form.setFieldValue("highestfee", payRange[1]);
          const NewData = {
            ...props.data,
            lowestfee: payRange[0],
            highestfee: payRange[1],
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
