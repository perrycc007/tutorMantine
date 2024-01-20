import React, { useState, useEffect } from "react";
import { RangeSlider, Switch, Button, TextInput } from "@mantine/core";
import { UserFormProvider, useUserForm } from "../FormModel/FormContext";

function BudgetForm(props) {
  const [payRange, setPayRange] = useState([100, 200]);
  const [checked, setChecked] = useState(false);
  const form = useUserForm();

  useEffect(() => {
    if (props.data.lowestfee && props.data.highestfee) {
      form.setValues(props.data);
      form.resetDirty(props.data);
      setPayRange([props.data.lowestfee, props.data.highestfee]);
      setChecked(props.data.status == "OPEN" ? true : false);
    } else {
      setPayRange([100, 200]);
    }
  }, [props.data]);

  return (
    <UserFormProvider form={form}>
      <form
        className="h-full mt-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (form.isValid()) {
            form.setFieldValue("lowestfee", payRange[0]);
            form.setFieldValue("highestfee", payRange[1]);
            const NewData = {
              ...props.data,
              lowestfee: payRange[0],
              highestfee: payRange[1],
              status: checked ? "OPEN" : "CLOSE",
            };
            props.updateForm(NewData);
          }
        }}
      >
        <p>
          工資: ${payRange[0]} - ${payRange[1]} 每小時
        </p>
        <RangeSlider
          className="my-4"
          id="pay-range"
          value={payRange}
          onChange={(newValue) => setPayRange(newValue)}
          min={60}
          max={1000}
          step={10}
          label={(value) => `$${value}`}
        />

        <Switch
          checked={checked}
          label={
            props.data.status == "BLOCKED" ? "您目前被封鎖" : "公開導師檔案"
          }
          disabled={props.data.status == "BLOCKED" ? true : false}
          onChange={(event) => setChecked(event.currentTarget.checked)}
        />
        <div className="flex justify-end mt-10">
          <Button type="submit">更新</Button>
        </div>
      </form>
    </UserFormProvider>
  );
}

export default BudgetForm;
