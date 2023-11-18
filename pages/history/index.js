import { useEffect, useState } from "react";
import userStore from "../../stores/stores";
import CaseAccordion from "../../component/Case/CaseAccordion";
import {
  fetchHistory,
  toggleStatus,
} from "../../component/Helper/AxiosFunction";
const Cases = () => {
  const [cases, setCases] = useState(null);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("student");
  const getUserid = userStore((state) => state.userId);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetchHistory(getUserid);
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
    console.log(id, status);
    try {
      toggleStatus(id, status, type);
      response.data.result;
    } catch (error) {
      console.error("Error toggling case status:", error);
    }
  }

  return (
    <div>
      <h1>補習申請歷史</h1>
      {loading && <p>Loading...</p>}

      {!loading && (
        <div>
          {cases ? (
            <CaseAccordion
              cases={cases}
              favourite={[]}
              type="edit"
              toggleStatusHandler={toggleCaseStatusHandler}
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
