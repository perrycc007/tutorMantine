import { useEffect, useState } from "react";
import userStore from "../../stores/stores";
import CaseAccordion from "../../component/Case/CaseAccordion";
import { stripFormEventProperties } from "../../component/Helper/HelperFunction";

import {
  fetchHistory,
  toggleStatus,
  updateStudentAxios,
} from "../../component/Helper/AxiosFunction";
const Cases = () => {
  const [cases, setCases] = useState(null);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("student");
  const getuserId = userStore((state) => state.userId);
  const updateStudentFormHanlder = async (userId, values) => {
    try {
      updateStudentAxios(userId, stripFormEventProperties(values));
      setCases((prev) => ({ ...prev, ...stripFormEventProperties(values) }));
      console.log(cases);
      const updatedArray = cases.map((item) => {
        if (item.studentId === values.studentId) {
          return {
            ...item,
            ...values,
          };
        } else {
          return item;
        }
      });
      setCases(updatedArray);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetchHistory(getuserId);
        console.log(result.data);
        setCases(result.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cases:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  async function toggleCaseStatusHandler(id, status) {
    try {
      const result = await toggleStatus(id, status, "cases");
      result;
    } catch (error) {
      console.error("Error toggling case status:", error);
    }
  }

  return (
    <div className="flex flex-col mt-4  md:px-8 2xl:px-4 max-w-7xl mx-auto ">
      <h1 className="text-3xl my-8">補習申請歷史</h1>
      {loading && <p>Loading...</p>}

      {!loading && (
        <div>
          {cases ? (
            <CaseAccordion
              cases={cases}
              favourite={[]}
              type="edit"
              updateStudentForm={updateStudentFormHanlder}
              toggleStatus={toggleCaseStatusHandler}
            />
          ) : (
            <p>並沒有任何歷史</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Cases;
