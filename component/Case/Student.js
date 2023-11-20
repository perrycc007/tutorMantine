import CaseAccordion from "./CaseAccordion";
// import Filter from "./Filter";
import { Accordion, Pagination } from "@mantine/core";
import { useState, useEffect } from "react";
import classes from "./Student.module.css";
import userStore from "../../stores/stores";
import {
  caseFilterAxios,
  addFavouriteCaseAxios,
  removeFavouriteCaseAxios,
} from "../Helper/AxiosFunction";
import usePagination from "./usePagination";
import AccordionFilter from "./AccordionFilter";
const Student = (props) => {
  const [filtered, setFiltered] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [page, setPage] = useState(1);
  const [filterForm, setFilterForm] = useState({
    locations: [],
    subjects: [],
    lowestfee: 100,
    highestfee: 200,
  });
  const userid = userStore((state) => state.userId);
  async function toggleFavouriteTopHandler(id, isFavourite) {
    if (isFavourite) {
      await removeFavouriteCaseAxios(userid, id);
    } else {
      await addFavouriteCaseAxios(userid, id);
    }
  }

  const filterFormHandler = (values) => {
    setFilterForm((prev) => ({ ...prev, ...values }));
  };
  const filterClickedHandler = () => {
    casesFilter(filterForm);
  };

  const PER_PAGE = 15;

  const count =
    props.cases !== undefined ? Math.ceil(props.cases.length / PER_PAGE) : 0;

  const _DATA = filtered
    ? usePagination(filteredList, PER_PAGE)
    : usePagination(props.cases, PER_PAGE);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
    if (!props.admin) {
      handleClick();
    }
  };

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

      <div>
        <Accordion>
          {_DATA.currentData().map((oneCase) => {
            return (
              <CaseAccordion
                key={oneCase.studentid}
                cases={oneCase}
                type="cases"
                toggleFavourite={toggleFavouriteTopHandler}
              />
            );
          })}
        </Accordion>
        <Pagination
          total={count}
          page={page}
          onChange={handleChange}
          variant="outlined"
          color="primary"
        />
      </div>
    </div>
  );
};

export default Student;
