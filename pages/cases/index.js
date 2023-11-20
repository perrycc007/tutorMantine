import Student from "../../component/Case/Student";
import cookie from "js-cookie";
import {
  CaseGetAxios,
  CaseGetAxiosWithFavourite,
} from "../../component/Helper/AxiosFunction";
import { useState, useEffect } from "react";
const Cases = (props) => {
  const [dynamicData, setDynamicData] = useState(props.cases);
  const accessToken = cookie.get("accessToken");
  useEffect(() => {
    const fetchData = async () => {
      if (accessToken) {
        // Fetch data that requires the accessToken
        console.log(accessToken);
        const response = await CaseGetAxiosWithFavourite();
        setDynamicData(response.data);
      }
    };

    fetchData();
  }, [accessToken]);
  return (
    <>
      <Student cases={dynamicData} />
    </>
  );
};

export async function getStaticProps() {
  const response = await CaseGetAxios();
  return {
    props: {
      cases: response.data,
    },
    revalidate: 1,
  };
}

export default Cases;
