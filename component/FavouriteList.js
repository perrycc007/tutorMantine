import { useEffect, useState } from "react";
import userStore from "../stores/stores";
import {
  getFavouriteTutorListAxios,
  getFavouriteStudentListAxios,
} from "./Helper/AxiosFunctionOld";
import { SegmentedControl } from "@mantine/core";
import Student from "./Case/Student";
import Tutor from "./Case/Tutor";
import classes from "./Case/Student.module.css";
// And now we can use these
const FavouriteList = () => {
  const [type, setType] = useState("student");
  const getuserId = userStore((state) => state.userId);

  const [favouriteCase, setFavouriteCase] = useState([]);
  const [favouriteTutor, setFavouriteTutor] = useState([]);

  async function getFavouriteTutorList(getuserId) {
    try {
      const response = await getFavouriteTutorListAxios(getuserId);

      setFavouriteTutor(response.data);
      return response.data;
    } catch (err) {}
  }
  async function getFavouriteStudentList(getuserId) {
    try {
      const response = await getFavouriteStudentListAxios(getuserId);
      setFavouriteCase(response.data);
      console.log(response.data);
      return response.data;
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
        <Student cases={favouriteCase} Favourite={true} type="tutor" />
      ) : (
        <Tutor cases={favouriteTutor} Favourite={true} type="cases" />
      )}
    </div>
  );
};

export default FavouriteList;
