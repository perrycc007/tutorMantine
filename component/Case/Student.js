import CaseAccordion from "./CaseAccordion2";
import AccordionFilter from "./AccordionFilter";
import { Accordion, Pagination } from "@mantine/core";
import usePagination from "./usePagination";
import { useState, useEffect } from "react";
import classes from "./Student.module.css";
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
    <div className={classes.container}>
      <div className={classes.filter}>
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
          // key={oneCase.tutorId}
          cases={_DATA}
          type="cases"
          toggleFavourite={toggleFavouriteTopHandler}
        />
      )}
    </div>
  );
};

export default Student;
