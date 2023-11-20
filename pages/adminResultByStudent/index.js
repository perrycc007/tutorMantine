import AdminDisplay from "../../component/AdminDisplay/AdminDisplay";
import NoSSR from "react-no-ssr";
import { Loader } from "@mantine/core";
import classes from "./adminResult.module.css";
import { useEffect, useState, useRef } from "react";

import {
  getMatchResultByStudentIdAxios,
  getStudentList,
} from "../../component/Helper/AxiosFunction";
const Result = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalNumberofPage, setTotalNumberofPage] = useState(1);
  const [item, setItem] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [id, setId] = useState(1);
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePreviousClickHandler = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      getMatchResultByStudentId(id, page - 1);
    }
  };
  const handleNextClickHandler = () => {
    if (page === totalNumberofPage) {
      return;
    } else {
      setPage((prev) => prev + 1);
      getMatchResultByStudentId(id, page + 1);
    }
  };

  async function getMatchResultByStudentId(id, page) {
    setLoading(true);
    try {
      const response = await getMatchResultByStudentIdAxios(id, page);
      setItem(response.data);
      setTotalNumberofPage(response.data[0].total_counts);
      setLoading(false);
      return response.data;
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }
  async function getMatchById(studentId) {
    setId(studentId);
    const response = await getMatchResultByStudentId(studentId, 1);
    return response;
  }

  async function getIdList() {
    const response = await getStudentList();
    setStudentList(response.data[0].studentIds);
  }
  useEffect(() => {
    getIdList();
    // setTotalNumberofPage(response.data.count);
    // setStudentList(response.data.studentid);
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
        {!loading && item && (
          <AdminDisplay
            passIdHandler={getMatchById}
            item={item}
            studentList={studentList}
            totalNumberofPage={totalNumberofPage}
            handlePreviousClick={handlePreviousClickHandler}
            handleNextClick={handleNextClickHandler}
            page={page}
          />
        )}
      </NoSSR>
    </div>
  );
};

export default Result;
