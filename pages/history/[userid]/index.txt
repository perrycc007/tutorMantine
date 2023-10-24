import CasesList from "../../../components/Case/CasesList";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingScreen from "../../../components/Layout/LoadingScreen";
const Cases = (props) => {
  console.log(props.cases);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (props.status == 200) {
      setLoading(false);
    }
  }),
    [props.reponse];
  async function toggleCaseStatusHandler(id, status) {
    console.log(id, status);
    const response = await axios.patch(
      `http://localhost:3001/history/updateCaseStatus`,
      {
        studentid: id,
        status: status,
      }
    );
    response.data.result;
  }

  return (
    <div>
      <h1>補習申請歷史</h1>
      {loading && <LoadingScreen />}

      {!loading && (
        <div>
          {props.cases ? (
            <CasesList
              cases={props.cases}
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

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  // fetch data from an API
  const response = await axios.get(
    `http://localhost:3001/history/${params.userid}`
  );
  return {
    props: {
      cases: response.data.result,
      status: response.status,
    },
    revalidate: 1,
  };
}

export default Cases;
