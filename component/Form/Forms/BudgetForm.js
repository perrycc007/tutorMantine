import React, { useState, useEffect } from "react";
import { RangeSlider, Button, TextInput } from "@mantine/core";
import { UserFormProvider, useUserForm } from "../FormModel/FormContext";

function BudgetForm(props) {
  const [payRange, setPayRange] = useState([100, 200]);
  const form = useUserForm();

  useEffect(() => {
    if (props.data.lowestfee && props.data.highestfee) {
      form.setValues(props.data);
      form.resetDirty(props.data);
      setPayRange([props.data.lowestfee, props.data.highestfee]);
    } else {
      setPayRange([100, 200]);
    }
  }, [props.data]);

  return (
    <UserFormProvider form={form}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (form.isValid()) {
            form.setFieldValue("lowestfee", payRange[0]);
            form.setFieldValue("highestfee", payRange[1]);
            const NewData = {
              ...props.data,
              lowestfee: payRange[0],
              highestfee: payRange[1],
            };
            props.updateForm(NewData);
          }
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
