import CaseAccordion from "./CaseAccordion";
import AccordionFilter from "./AccordionFilter";
import { useState, useEffect } from "react";
import userStore from "../../stores/stores";
import {
  tutorFilterAxios,
  removeFavouriteTutorAxios,
  addFavouriteTutorAxios,
} from "../Helper/AxiosFunction";

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
    tutorFilter(filterForm).catch((error) => {
      alert(`Error applying filter: ${error.message}`);
    });
  };

  async function toggleFavouriteTopHandler(id, isFavourite) {
    try {
      if (isFavourite) {
        await removeFavouriteTutorAxios(userId, id);
      } else {
        await addFavouriteTutorAxios(userId, id);
      }
    } catch (error) {
      alert(`Error toggling favourite: ${error.message}`);
    }
  }

  async function tutorFilter(preference) {
    try {
      const result = await tutorFilterAxios(preference);
      setFiltered(true);
      setFilteredList(result.data);
    } catch (error) {
      showNotification({
        title: "Error",
        message: "Failed to fetch filtered tutors",
        color: "red",
      });
    }
  }

  return (
    <div className="mt-8  m-4  md:px-8 2xl:px-4 max-w-7xl">
      {!props.Favourite && <h1 className="text-3xl my-8">精英導師</h1>}
      {!props.Favourite && (
        <AccordionFilter
          filterHandler={tutorFilter} // Renamed for correct naming convention
          updateFilterForm={filterFormHandler}
          preference={filterForm}
          filterClicked={filterClickedHandler}
        />
      )}
      {_DATA && (
        <CaseAccordion
          cases={_DATA}
          type="tutor"
          toggleFavourite={toggleFavouriteTopHandler}
        />
      )}
    </div>
  );
};

export default Tutor;
