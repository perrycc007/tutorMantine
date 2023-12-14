import Student from "../../component/Case/Student";
import cookie from "js-cookie";
import {
  CaseGetAxios,
  CaseGetAxiosWithFavourite,
} from "../../component/Helper/AxiosFunction";
import { useState, useEffect } from "react";

const Cases = (props) => {
  const [dynamicData, setDynamicData] = useState(props.cases);
  const accessToken = cookie.get("access_token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (accessToken) {
          const response = await CaseGetAxiosWithFavourite();
          setDynamicData(response.data);
        }
      } catch (error) {
        console.error("Error fetching cases with favourites:", error);
        // Handle the error appropriately
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
  try {
    const response = await CaseGetAxios();
    return {
      props: {
        cases: response.data,
      },
      revalidate: 1,
    };
  } catch (error) {
    console.error("Error fetching cases:", error);
    return {
      props: {
        cases: [],
      },
      revalidate: 1,
    };
  }
}

export default Cases;
