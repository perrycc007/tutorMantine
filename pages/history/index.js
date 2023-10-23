import { useEffect, useState } from "react";
import axios from "axios";
import userStore from "../../stores/stores";
import CaseAccordion from "../../component/Case/CaseAccordion";
const Cases = () => {
  const [cases, setCases] = useState(null);
  const [loading, setLoading] = useState(true);
  const getUserid = userStore((state) => state.userId);
  const result = [
    {
      availtime: null,
      expectation: null,
      genderrequirement: "None",
      highestduration: 100,
      highestfee: 340,
      highestfrequency: 4,
      language: null,
      lastOnline: "2023-07-15T13:49:21.000Z",
      level: null,
      location: '["則魚涌"]',
      lowestduration: 75,
      lowestfee: 200,
      lowestfrequency: 1,
      others: "ff",
      status: "open",
      studentid: 44,
      subject: '["數學及統計學","地理","數學(M2)","中國文學","全科"]',
      userid: 1,
    },
    {
      availtime: null,
      expectation: null,
      genderrequirement: "None",
      highestduration: 100,
      highestfee: 340,
      highestfrequency: 4,
      language: null,
      lastOnline: "2023-07-15T13:49:21.000Z",
      level: null,
      location: '["中半山","則魚涌"]',
      lowestduration: 75,
      lowestfee: 200,
      lowestfrequency: 1,
      others: "ff",
      status: "open",
      studentid: 45,
      subject: '["數學及統計學","地理","數學(M2)","中國文學","全科"]',
      userid: 2,
    },
  ];
  useEffect(() => {
    setCases(result);
    async function fetchData() {
      try {
        // const response = await axios.get(
        //   `http://localhost:3001/history/${getUserid}`
        // );
        // setCases(response.data.result);
        setCases(result);
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
      const response = await axios.patch(
        `http://localhost:3001/history/updateCaseStatus`,
        {
          studentid: id,
          status: status,
        }
      );
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
