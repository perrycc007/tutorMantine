import Student from "../../component/Case/Student";
import cookie from "js-cookie";
import {
  CaseGetAxios,
  CaseGetAxiosWithFavourite,
} from "../../component/Helper/AxiosFunction";
import { useState, useEffect } from "react";

const Cases = (props) => {
  const [dynamicData, setDynamicData] = useState(props.cases);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = cookie.get("access_token");
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
  }, []);

  return (
    <div className="flex flex-col mt-4  md:px-8 2xl:px-4 max-w-7xl mx-auto ">
      <Student cases={dynamicData} />
    </div>
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
