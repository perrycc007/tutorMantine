import CaseAccordion from "./CaseAccordion";
import userStore from "../../stores/stores";
// import Filter from "./Filter";
import { useState, useEffect } from "react";
import classes from "./Student.module.css";
import { caseFilterAxios, UpdateFavorite } from "../Helper/AxiosFunction";
import AccordionFilter from "./AccordionFilter";
const Student = (props) => {
  const getUserid = userStore((state) => state.userId);
  const FavouriteCases = userStore((state) => state.favouriteCase);
  const setfavouriteCase = userStore((state) => state.setFavouriteCase);
  const fetchFavouriteCase = userStore((state) => state.fetchFavouriteCases);
  const [filtered, setFiltered] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [filterForm, setFilterForm] = useState({
    locations: [],
    subjects: [],
    lowestfee: 100,
    highestfee: 200,
  });
  const filterFormHandler = (values) => {
    console.log(values);
    // console.log({ ...filterForm, ...values });
    setFilterForm((prev) => ({ ...prev, ...values }));
  };
  const filterClickedHandler = () => {
    casesFilter(filterForm);
  };
  const toggleFavouriteTopHandler = (id) => {
    let newFavourite = FavouriteCases;
    if (newFavourite.includes(id)) {
      newFavourite = newFavourite.filter((exist) => exist != id);
    } else {
      newFavourite = [...newFavourite, id];
    }
    setfavouriteCase(newFavourite);
    UpdateFavorite(newFavourite, getUserid);
  };

  useEffect(() => {
    fetchFavouriteCase(getUserid);
  }, []);

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
      {!filtered && (
        <CaseAccordion
          cases={props.cases}
          type="cases"
          favourite={FavouriteCases}
          toggleFavouriteHandler={toggleFavouriteTopHandler}
        />
      )}
      {filtered && (
        <CaseAccordion
          cases={filteredList}
          type="cases"
          favourite={FavouriteCases}
          toggleFavouriteHandler={toggleFavouriteTopHandler}
        />
      )}
    </div>
  );
};

export default Student;
