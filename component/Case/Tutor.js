import CaseAccordion from "./CaseAccordion";
import axios from "axios";
import userStore from "../../stores/stores";
import Filter from "./Filter";
import { useState, useEffect } from "react";
import Axios from "axios";
import classes from "./Student.module.css";

const Tutor = (props) => {
  const url = "http://localhost:3001/favourite/tutor";
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

    async function UpdateFavorite(newFavourite) {
      const res = await Axios.patch(url, {
        caseid: newFavourite,
        userid: getUserid,
      });
      // console.log(res.data.result);
      return res;
    }
    UpdateFavorite(newFavourite);
  };

  useEffect(() => {
    fetchFavouriteTutor(getUserid);
  }, []);

  async function tutorFilter(preference) {
    const result = await axios.post(`http://localhost:3001/tutor`, {
      preference,
    });
    console.log(result.data);
    setFiltered(true);
    setFilteredList(result.data);
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
