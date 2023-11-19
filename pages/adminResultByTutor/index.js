import AdminDisplay from "../../component/AdminDisplay/AdminDisplay";
import NoSSR from "react-no-ssr";
import { Loader } from "@mantine/core";
import classes from "./adminResult.module.css";
import { useEffect, useState, useRef } from "react";
import {
  getMatchResultByTutorIdAxios,
  getTutorList,
} from "../../component/Helper/AxiosFunction";
const Result = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalNumberofPage, setTotalNumberofPage] = useState(1);
  const [item, setItem] = useState([]);
  const [tutorList, setTutorList] = useState([]);
  const [id, setId] = useState(1);
  const pageNumberHandler = (p) => {
    setPage(p);
    getMatchResultByTutorId(id, page);
  };
  async function getMatchResultByTutorId(studentId, page) {
    setLoading(true);
    try {
      const response = await getMatchResultByTutorIdAxios(studentId, page);
      console.log(response.data);
      setItem(response.data);
      // setTotalNumberofPage(response.data[1].totalNumberofMatch);
      // if (response.status == 200) {
      //   setLoading(false);
      //   return response.data;
      // }
    } catch (err) {
      console.log(err);
    }
  }
  const getMatchById = (id) => {
    setId(id);
    getMatchResultByTutorId(id, page);
  };
  useEffect(() => {
    const response = getTutorList();
    console.log(response.data);
    // setTotalNumberofPage(response.data.count);
    // setTutorList(response.data.tutorid);
  }, [page]);
  return (
    <div>
      <NoSSR>
        <h1 className={classes.h1}>補習搜尋</h1>
        {loading && <Loader />}
        {/* {!loading && (
          <div className={classes.searchbar}>
            <TextInput inputRef={studentidRef} />{" "}
            <Button onClick={getSingleMatchResult}>Search</Button>
          </div>
        )} */}
        {/* {loading && item && (
          <AdminDisplay
            passIdHandler={getMatchById}
            match={item}
            studentList={tutorList}
            totalNumberofPage={totalNumberofPage}
            pageNumber={pageNumberHandler}
          />
        )} */}
      </NoSSR>
    </div>
  );
};

export default Result;