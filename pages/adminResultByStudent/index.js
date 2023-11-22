import AdminDisplay from "../../component/AdminDisplay/AdminDisplay";
import NoSSR from "react-no-ssr";
import { Loader } from "@mantine/core";
import classes from "./adminResult.module.css";
import { useEffect, useState, useRef } from "react";
import {
  stripFormEventProperties,
  cleanProfileObject,
  cleanStudentObject,
} from "../../component/Helper/HelperFunction";
import {
  updateProfileAdminAxios,
  updateTutorAdminAxios,
  updateStudentAdminAxios,
  getMatchResultBystudentIdAxios,
  getStudentList,
} from "../../component/Helper/AxiosFunction";
const Result = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalNumberofPage, setTotalNumberofPage] = useState(1);
  const [item, setItem] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [id, setId] = useState(1);
  const updateFormHanlder = (userId, values) => {
    updateProfileAdminAxios(
      userId,
      cleanProfileObject(stripFormEventProperties(values))
    );
  };
  const updateTutorFormHandler = (userId, values) => {
    const { matchstatus, idmatch, ...tutor } = values;
    updateTutorAdminAxios(userId, stripFormEventProperties(tutor));
    const updatedArray = item.map((item) => {
      if (item.tutorid === tutor.tutorId) {
        // Create a new object with the desired changes
        return {
          ...item,
          // Add or update properties as needed
          tutor: {
            ...item.tutor,
            // Update properties within the 'tutor' object
            // For example, change the 'status' property
            ...values,
            // Add or update other properties within the 'tutor' object if needed
          },
          // Add or update other properties in the main object if needed
        };
      } else {
        // If the tutorid does not match, return the original object as is
        return item;
      }
    });
    setItem(updatedArray);
  };
  const updateStudentFormHanlder = (userId, values) => {
    updateStudentAdminAxios(
      userId,
      cleanStudentObject(stripFormEventProperties(values))
    );
    // setItem
  };

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePreviousClickHandler = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      getMatchResultBystudentId(id, page - 1);
    }
  };
  const handleNextClickHandler = () => {
    if (page === totalNumberofPage) {
      return;
    } else {
      setPage((prev) => prev + 1);
      getMatchResultBystudentId(id, page + 1);
    }
  };

  async function getMatchResultBystudentId(id, page) {
    setLoading(true);
    try {
      const response = await getMatchResultBystudentIdAxios(id, page);
      setItem(response.data);
      setTotalNumberofPage(Math.ceil(response.data[0].total_counts / 5));
      setLoading(false);
      return response.data;
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }
  async function getMatchById(studentId) {
    setId(studentId);
    const response = await getMatchResultBystudentId(studentId, 1);
    return response;
  }

  async function getIdList() {
    const response = await getStudentList();
    setStudentList(response.data[0].studentIds);
  }
  useEffect(() => {
    getIdList();
    // setTotalNumberofPage(response.data.count);
    // setStudentList(response.data.studentId);
  }, [page]);

  useEffect(() => {}, [item]);
  return (
    <div>
      <NoSSR>
        <h1 className={classes.h1}>補習搜尋</h1>
        {loading && <Loader />}
        {/* {!loading && (
          <div className={classes.searchbar}>
            <TextInput inputRef={studentIdRef} />{" "}
            <Button onClick={getSingleMatchResult}>Search</Button>
          </div>
        )} */}
        {!loading && item && (
          <AdminDisplay
            passIdHandler={getMatchById}
            item={item}
            studentList={studentList}
            totalNumberofPage={totalNumberofPage}
            updateStudentForm={updateStudentFormHanlder}
            updateForm={updateFormHanlder}
            updateTutorForm={updateTutorFormHandler}
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
