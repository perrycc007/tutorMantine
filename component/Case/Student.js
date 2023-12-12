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
} from "../Helper/AxiosFunctionOld";
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
    casesFilter(filterForm);
  };
  async function toggleFavouriteTopHandler(id, isFavourite) {
    if (isFavourite) {
      await removeFavouriteStudentAxios(userId, id);
    } else {
      await addFavouriteStudentAxios(userId, id);
    }
  }

  async function casesFilter(preference) {
    const result = await caseFilterAxios(preference);
    console.log(result.data);
    setFiltered(true);
    setFilteredList(result.data);
  }

  return (
    <div className="mt-8  md:px-8 2xl:px-4 max-w-7xl mx-auto ">
      <h1 className="text-3xl my-8">補習個案</h1>
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
          cases={_DATA}
          type="cases"
          toggleFavourite={toggleFavouriteTopHandler}
        />
      )}
    </div>
  );
};

export default Student;
