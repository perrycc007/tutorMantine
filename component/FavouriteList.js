import { useEffect, useState } from "react";
import userStore from "../stores/stores";
import {
  getFavouriteTutorListAxios,
  getFavouriteStudentListAxios,
} from "./Helper/AxiosFunction";
import { SegmentedControl } from "@mantine/core";
import { useState } from "react";

import Student from "./Case/Student";
import Tutor from "./Case/Tutor";
import classes from "./Case/Student.module.css";
// And now we can use these
const FavouriteList = () => {
  const [type, setType] = useState("cases");
  const getuserId = userStore((state) => state.userId);

  const [favouriteCase, setFavouriteCase] = useState([]);
  const [favouriteTutor, setFavouriteTutor] = useState([]);

  async function getFavouriteTutorList(getuserId) {
    try {
      const response = await getFavouriteTutorListAxios(getuserId);
      setFavouriteTutor(response.data.result);
      return response.data.result;
    } catch (err) {}
  }
  async function getFavouriteStudentList(getuserId) {
    try {
      const response = await getFavouriteStudentListAxios(getuserId);
      setFavouriteCase(response.data.result);
      return response.data.result;
    } catch (err) {}
  }

  useEffect(() => {
    getFavouriteTutorList(getuserId);
    getFavouriteStudentList(getuserId);
  }, []);

  return (
    <div className={classes.container}>
      <h1>我的最愛</h1>
      <SegmentedControl
        value={type}
        onChange={setType}
        data={[
          { label: "補習個案", value: "student" },
          { label: "補習導師", value: "tutor" },
        ]}
      />
      {type == "student" ? (
        <Student cases={favouriteCase} Favourite={true} />
      ) : (
        <Tutor cases={favouriteTutor} Favourite={true} />
      )}
    </div>
  );
};

export default FavouriteList;
