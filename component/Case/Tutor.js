import CaseAccordion from "./CaseAccordion";
import AccordionFilter from "./AccordionFilter";
import { Accordion, Pagination } from "@mantine/core";
import usePagination from "./usePagination";
import { useState, useEffect } from "react";
import classes from "./Student.module.css";
import userStore from "../../stores/stores";
import {
  tutorFilterAxios,
  removeFavouriteTutorAxios,
  addFavouriteTutorAxios,
} from "../Helper/AxiosFunction";
const Tutor = (props) => {
  const [filtered, setFiltered] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [page, setPage] = useState(1);
  const userid = userStore((state) => state.userId);
  const [filterForm, setFilterForm] = useState({
    locations: [],
    subjects: [],
    lowestfee: 100,
    highestfee: 200,
  });
  const filterFormHandler = (values) => {
    setFilterForm((prev) => ({ ...prev, ...values }));
  };
  const filterClickedHandler = () => {
    tutorFilter(filterForm);
  };
  async function toggleFavouriteTopHandler(id, isFavourite) {
    if (isFavourite) {
      await removeFavouriteTutorAxios(userid, id);
    } else {
      await addFavouriteTutorAxios(userid, id);
    }
  }

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
  async function tutorFilter(preference) {
    const result = await tutorFilterAxios(preference);
    console.log(result.data);
    setFiltered(true);
    setFilteredList(result.data);
  }
  return (
    <div className={classes.container}>
      <div className={classes.filter}>
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
        <Accordion>
          {_DATA.currentData().map((oneCase) => {
            return (
              <CaseAccordion
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
export default Tutor;
