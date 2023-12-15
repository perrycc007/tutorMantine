import { useEffect, useState } from "react";
import userStore from "../stores/stores";
import {
  getFavouriteTutorListAxios,
  getFavouriteStudentListAxios,
} from "./Helper/AxiosFunction";
import { SegmentedControl } from "@mantine/core";
import Student from "./Case/Student";
import Tutor from "./Case/Tutor";
import classes from "./Case/Student.module.css";

const FavouriteList = () => {
  const [type, setType] = useState("student");
  const getuserId = userStore((state) => state.userId);

  const [favouriteCase, setFavouriteCase] = useState([]);
  const [favouriteTutor, setFavouriteTutor] = useState([]);

  async function getFavouriteTutorList(userId) {
    try {
      const response = await getFavouriteTutorListAxios(userId);
      setFavouriteTutor(response.data);
    } catch (err) {
      alert(err);
    }
  }

  async function getFavouriteStudentList(userId) {
    try {
      const response = await getFavouriteStudentListAxios(userId);
      setFavouriteCase(response.data);
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    if (getuserId) {
      getFavouriteTutorList(getuserId);
      getFavouriteStudentList(getuserId);
    }
  }, [getuserId]);

  return (
    <div className="flex flex-col mt-4  md:px-8 2xl:px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl my-8">我的最愛</h1>
      <SegmentedControl
        value={type}
        onChange={setType}
        data={[
          { label: "補習個案", value: "student" },
          { label: "補習導師", value: "tutor" },
        ]}
      />
      {type === "student" ? (
        <Student cases={favouriteCase} Favourite={true} type="tutor" />
      ) : (
        <Tutor cases={favouriteTutor} Favourite={true} type="cases" />
      )}
    </div>
  );
};

export default FavouriteList;
