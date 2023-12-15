import React, { useState, useEffect } from "react";
import { RangeSlider, Button, Accordion } from "@mantine/core";
import { UserFormProvider, useUserForm } from "../Form/FormModel/FormContext";
import LocationForms from "../Form/Forms/Location/LocationForms";
import SubjectsForm from "../Form/Forms/Subject/SubjectsForms";
export default function AccordionFilter(props) {
  const [payRange, setPayRange] = useState([100, 200]);
  const initialValues = {
    locations: [],
    subjects: [],
    lowestfee: 100,
    highestfee: 200,
  };
  const updateFilterHanlder = (values) => {
    console.log(values);
    props.updateFilterForm(values);
    form.setValues(values);
  };
  const form = useUserForm({
    initialValues: { ...initialValues },
  });

  const RangeSliderHandler = (event) => {
    setPayRange(event);
    props.updateFilterForm({ lowestfee: event[0], highestfee: event[1] });
    form.setValues({ lowestfee: event[0], highestfee: event[1] });
  };
  return (
    <div className="mb-4">
      <UserFormProvider form={form}>
        <div>
          <div className="flex justify-between">
            <p>
              工資: ${payRange[0]} - ${payRange[1]} 每小時
            </p>
            <button onClick={props.filterClicked}>Filter</button>
          </div>
          <RangeSlider
            id="pay-range"
            value={payRange}
            onChange={(newValue) => RangeSliderHandler(newValue)}
            min={60}
            max={1000}
            step={10}
            label={(value) => `$${value}`}
            className="my-4"
          />
        </div>
        <Accordion className="mt-4" variant="contained">
          <Accordion.Item key={"location"} value="location">
            <Accordion.Control>地點</Accordion.Control>
            <Accordion.Panel>
              <LocationForms
                updateForm={updateFilterHanlder}
                data={props.preference}
                type="filter"
              />
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="subject">
            <Accordion.Control>學科</Accordion.Control>
            <Accordion.Panel>
              <SubjectsForm
                updateForm={updateFilterHanlder}
                data={props.preference}
                type="filter"
              />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </UserFormProvider>
    </div>
  );
}
