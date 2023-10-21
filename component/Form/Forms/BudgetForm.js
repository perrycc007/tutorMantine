import React, { useState, useEffect } from "react";
import { RangeSlider, Button, TextInput } from "@mantine/core";
import { UserFormProvider, useUserForm } from "../FormModel/FormContext";
import userStore from "../../../stores/stores";

function BudgetForm() {
  const [payRange, setPayRange] = useState([100, 200]);
  const form = useUserForm();
  const Profile = userStore((state) => state.Profile);
  const updateProfile = userStore((state) => state.updateProfile);
  const loadInitialValues = (Profile) => {
    console.log("load");
    return new Promise((resolve) => {
      setTimeout(() => resolve(Profile), 1000);
    });
  };
  useEffect(() => {
    loadInitialValues(Profile).then((values) => {
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
          console.log(`Pay range: ${payRange[0]} - ${payRange[1]} per hour`);
          const NewProfile = {
            ...Profile,
            lowestpay: payRange[0],
            highestpay: payRange[1],
          };
          updateProfile(NewProfile);
        }}
      >
        <p>
          工資: ${payRange[0]} - ${payRange[1]} 每小時
        </p>
        {/* <TextInput
          type="number"
          value={payRange[0]}
          onChange={handleMinPayChange}
        />
        <TextInput
          type="number"
          value={payRange[1]}
          onChange={handleMaxPayChange}
        /> */}
        <RangeSlider
          id="pay-range"
          value={payRange}
          onChange={(newValue) => setPayRange(newValue)}
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
