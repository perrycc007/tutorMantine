import React, { useState, useEffect } from "react";
import { RangeSlider, Button, Accordion } from "@mantine/core";
import { UserFormProvider, useUserForm } from "../Form/FormModel/FormContext";
import LocationForms from "../Form/Forms/Location/LocationForms";
import SubjectsForm from "../Form/Forms/Subject/SubjectsForms";
export default function AccordionFilter(props) {
  const [payRange, setPayRange] = useState([100, 200]);
  const initialValues = {
    location: [],
    time: [],
    lowestpay: 100,
    highestpay: 200,
  };
  const updateFilterHanlder = (values) => {
    props.updateFilterForm(values);
    form.setValues(values);
  };
  const form = useUserForm({
    initialValues: { ...initialValues },
  });
  return (
    <div>
      <UserFormProvider form={form}>
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
        <Accordion>
          <Accordion.Item key={"location"} value="location">
            <Accordion.Control>Location</Accordion.Control>
            <Accordion.Panel>
              <LocationForms
                updateForm={updateFilterHanlder}
                data={initialValues}
              />
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="subject">
            <Accordion.Control>Subject</Accordion.Control>
            <Accordion.Panel>
              <SubjectsForm
                updateForm={updateFilterHanlder}
                data={initialValues}
              />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </UserFormProvider>
    </div>
  );
}
