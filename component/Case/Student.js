import CaseAccordion from "./CaseAccordion";
import AccordionFilter from "./AccordionFilter";
import { Accordion, Pagination } from "@mantine/core";
import usePagination from "./usePagination";
import { useState, useEffect } from "react";
import userStore from "../../stores/stores";
import {
  caseFilterAxios,
  addFavouriteStudentAxios,
  removeFavouriteStudentAxios,
} from "../Helper/AxiosFunction";
const Student = (props) => {
  const [filtered, setFiltered] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [page, setPage] = useState(1);
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
    casesFilter(filterForm).catch((error) => {
      alert(`Error applying filter: ${error.message}`);
    });
  };

  async function toggleFavouriteTopHandler(id, isFavourite) {
    try {
      if (isFavourite) {
        await removeFavouriteStudentAxios(userId, id);
      } else {
        await addFavouriteStudentAxios(userId, id);
      }
    } catch (error) {
      alert(`Error toggling favourite: ${error.message}`);
    }
  }

  async function casesFilter(preference) {
    try {
      const result = await caseFilterAxios(preference);
      setFiltered(true);
      setFilteredList(result.data);
    } catch (error) {
      showNotification({
        title: "Error",
        message: "Failed to fetch filtered cases",
        color: "red",
      });
    }
  }
  return (
    <div className="mt-8  m-4  md:px-8 2xl:px-4 max-w-7xl">
      {!props.Favourite && <h1 className="text-3xl my-8">補習個案</h1>}
      <div>
        {!props.Favourite && (
          <AccordionFilter
            FilterHanlder={casesFilter}
            updateFilterForm={filterFormHandler}
            preference={filterForm}
            filterClicked={filterClickedHandler}
          />
        )}
      </div>
      {_DATA && (
        <CaseAccordion
          className="w-full"
          cases={_DATA}
          type="cases"
          toggleFavourite={toggleFavouriteTopHandler}
        />
      )}
    </div>
  );
};

export default Student;
