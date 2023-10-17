import CaseAccordion from "./CaseAccordion";
import axios from "axios";
import userStore from "../../stores/stores";
// import Filter from "./Filter";
import { useState, useEffect } from "react";
import Axios from "axios";
import classes from "./Student.module.css";

const Student = (props) => {
  const getUserid = userStore((state) => state.userId);
  const FavouriteCases = userStore((state) => state.favouriteCase);
  const setfavouriteCase = userStore((state) => state.setFavouriteCase);
  const fetchFavouriteCase = userStore((state) => state.fetchFavouriteCases);
  const [filtered, setFiltered] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const url = "http://localhost:3001/favourite/case";
  const toggleFavouriteTopHandler = (id) => {
    let newFavourite = FavouriteCases;
    if (newFavourite.includes(id)) {
      newFavourite = newFavourite.filter((exist) => exist != id);
    } else {
      newFavourite = [...newFavourite, id];
    }
    setfavouriteCase(newFavourite);

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
    fetchFavouriteCase(getUserid);
  }, []);

  async function casesFilter(preference) {
    const result = await axios.post(`http://localhost:3001/cases`, {
      preference,
    });
    console.log(result.data);
    setFiltered(true);
    setFilteredList(result.data);
  }

  return (
    <div className={classes.container}>
      <div className={classes.filter}>
        {/* {!props.Favourite && <Filter FilterHanlder={casesFilter} />} */}
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
        <CaseListUser
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
