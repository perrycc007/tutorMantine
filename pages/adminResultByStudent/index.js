import AdminDisplay from "../../component/AdminDisplay/AdminDisplay";
import NoSSR from "react-no-ssr";
import { Loader } from "@mantine/core";
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
  const [index, setIndex] = useState(0);
  const indexPass = (value) => {
    setIndex(value);
  };

  const updateFormHanlder = async (userId, values) => {
    try {
      await updateProfileAdminAxios(
        userId,
        cleanProfileObject(stripFormEventProperties(values))
      );
      console.log(item, "before");
      if (index >= 0) {
        const updatedArray = [...item]; // Create a shallow copy of the array
        updatedArray[index].tutor.profile = {
          ...updatedArray[0].tutor.profile,
          ...cleanProfileObject(stripFormEventProperties(values)),
        };

        setItem(updatedArray);
      } else {
        const updatedArray = [...item]; // Create a shallow copy of the array
        updatedArray[0] = {
          ...updatedArray[0],
          ...cleanProfileObject(stripFormEventProperties(values)),
        };

        setItem(updatedArray);
      }
    } catch (error) {
      alert(`Failed to update profile: ${error.message}`);
    }
  };
  const updateTutorFormHandler = async (userId, values) => {
    try {
      const { matchstatus, idmatch, ...tutor } = values;
      await updateTutorAdminAxios(userId, stripFormEventProperties(tutor));

      const updatedArray = [...item]; // Create a shallow copy of the array
      updatedArray[index].tutor = {
        ...updatedArray[index].tutor,
        ...item.tutor,
        ...values,
      };
      setItem(updatedArray);
    } catch (error) {
      alert(`Failed to update tutor: ${error.message}`);
    }
  };
  const updateStudentFormHanlder = async (userId, values) => {
    try {
      await updateStudentAdminAxios(
        userId,
        cleanStudentObject(stripFormEventProperties(values))
      );
      const updatedStudent = item.map((item) => {
        if (item.studentid === values.studentId) {
          return {
            ...item,
            ...cleanStudentObject(stripFormEventProperties(values)),
          };
        } else {
          return item;
        }
      });
      setItem(updatedStudent);
    } catch (error) {
      alert(`Failed to update student: ${error.message}`);
    }
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
      console.log(`Failed to fetch match results: ${error}`);
      setLoading(false);
    }
  }
  async function getMatchById(studentId) {
    setId(studentId);
    const response = await getMatchResultBystudentId(studentId, 1);
    return response;
  }

  async function getIdList() {
    try {
      const response = await getStudentList();
      setStudentList(response.data[0].studentIds);
    } catch (error) {
      console.log(`Failed to fetch student list: ${error}`);
    }
  }

  useEffect(() => {
    getIdList();
    // setTotalNumberofPage(response.data.count);
    // setStudentList(response.data.studentId);
  }, [page]);

  useEffect(() => {}, [item, updateStudentFormHanlder]);
  return (
    <div className="mt-8 px-3 md:px-8 2xl:px-4 max-w-7xl mx-auto ">
      <NoSSR>
        <h1 className="text-3xl my-8">補習搜尋</h1>
        {loading && <Loader />}
        {/* {!loading && (
          <div className={classes.searchbar}>
            <TextInput inputRef={studentIdRef} />{" "}
            <button  onClick={getSingleMatchResult}>Search</Button>
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
            passIndex={indexPass}
          />
        )}
      </NoSSR>
    </div>
  );
};

export default Result;
