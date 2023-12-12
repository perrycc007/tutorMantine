import AdminDisplay from "../../component/AdminDisplay/AdminDisplay";
import NoSSR from "react-no-ssr";
import { Loader } from "@mantine/core";
import { useEffect, useState, useRef } from "react";
import {
  getMatchResultBytutorIdAxios,
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
    getMatchResultBytutorId(id, page);
  };
  async function getMatchResultBytutorId(studentId, page) {
    setLoading(true);
    try {
      const response = await getMatchResultBytutorIdAxios(studentId, page);
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
    getMatchResultBytutorId(id, page);
  };
  useEffect(() => {
    const response = getTutorList();
    console.log(response.data);
    // setTotalNumberofPage(response.data.count);
    // setTutorList(response.data.tutorId);
  }, [page]);
  return (
    <div>
      <NoSSR>
        <h1>補習搜尋</h1>
        {loading && <Loader />}
        {/* {!loading && (
          <div className={classes.searchbar}>
            <TextInput inputRef={studentIdRef} />{" "}
            <Button  onClick={getSingleMatchResult}>Search</Button>
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
