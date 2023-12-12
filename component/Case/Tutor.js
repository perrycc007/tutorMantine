import CaseAccordion from "./CaseAccordion";
import AccordionFilter from "./AccordionFilter";

import { useState, useEffect } from "react";
import userStore from "../../stores/stores";
import {
  tutorFilterAxios,
  removeFavouriteTutorAxios,
  addFavouriteTutorAxios,
} from "../Helper/AxiosFunctionOld";
const Tutor = (props) => {
  const [filtered, setFiltered] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const userId = userStore((state) => state.userId);
  const [filterForm, setFilterForm] = useState({
    locations: [],
    subjects: [],
    lowestfee: 100,
    highestfee: 200,
  });
  const _DATA = filtered ? filteredList : props.cases;
  const filterFormHandler = (values) => {
    setFilterForm((prev) => ({ ...prev, ...values }));
  };
  const filterClickedHandler = () => {
    tutorFilter(filterForm);
  };
  async function toggleFavouriteTopHandler(id, isFavourite) {
    if (isFavourite) {
      await removeFavouriteTutorAxios(userId, id);
    } else {
      await addFavouriteTutorAxios(userId, id);
    }
  }

  async function tutorFilter(preference) {
    const result = await tutorFilterAxios(preference);
    console.log(result.data);
    setFiltered(true);
    setFilteredList(result.data);
  }
  return (
    <div className="mt-8  md:px-8 2xl:px-4 max-w-7xl mx-auto ">
      {!props.Favourite && <h1 className="text-3xl my-8">精英導師</h1>}
      <div>
        {!props.Favourite && (
          <AccordionFilter
            FilterHanlder={tutorFilter}
            updateFilterForm={filterFormHandler}
            preference={filterForm}
            filterClicked={filterClickedHandler}
          />
        )}
      </div>

      <div>
        {_DATA && (
          <CaseAccordion
            // key={oneCase.tutorId}
            cases={_DATA}
            type="tutor"
            toggleFavourite={toggleFavouriteTopHandler}
          />
        )}
      </div>
    </div>
  );
};
export default Tutor;
