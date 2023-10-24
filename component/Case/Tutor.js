import CaseAccordion from "./CaseAccordion";
import axios from "axios";
import userStore from "../../stores/stores";
import Filter from "./Filter";
import { useState, useEffect } from "react";
import Axios from "axios";
import classes from "./Student.module.css";
import { tutorFilterAxios } from "../Helper/AxiosFunction";
const Tutor = (props) => {
  const [filtered, setFiltered] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const getUserid = userStore((state) => state.userId);
  const FavouriteTutor = userStore((state) => state.favouriteTutor);
  const setfavouriteTutor = userStore((state) => state.setFavouriteTutor);
  const fetchFavouriteTutor = userStore((state) => state.fetchFavouriteTutor);

  const toggleFavouriteTopHandler = (id) => {
    let newFavourite = FavouriteTutor;
    if (newFavourite.includes(id)) {
      newFavourite = newFavourite.filter((exist) => exist != id);
    } else {
      newFavourite = [...newFavourite, id];
    }
    setfavouriteTutor(newFavourite);

    UpdateFavorite(newFavourite, getUserid);
  };

  useEffect(() => {
    fetchFavouriteTutor(getUserid);
  }, []);

  async function tutorFilter(preference) {
    try {
      const result = await tutorFilterAxios(preference);
      console.log(result.data);
      setFiltered(true);
      setFilteredList(result.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.bannerSectionTutor}>
        {/* <div className={classes.bannerOverlayTutor}> */}
        <div className={classes.bannerContentTutor}>
          <h2>導師</h2>
          <p>導師</p>
        </div>
        {/* </div> */}
      </div>
      <div className={classes.contentContainer}>
        <div className={classes.filter}>
          {!props.Favourite && <Filter FilterHanlder={tutorFilter} />}
        </div>
        <div className={classes.caseList}>
          {!filtered && (
            <CaseAccordion
              cases={props.cases}
              type="tutor"
              favourite={FavouriteTutor}
              toggleFavouriteHandler={toggleFavouriteTopHandler}
            />
          )}
          {filtered && (
            <CaseAccordion
              cases={filteredList}
              type="tutor"
              favourite={FavouriteTutor}
              toggleFavouriteHandler={toggleFavouriteTopHandler}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Tutor;
