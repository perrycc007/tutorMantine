import Tutor from "../../component/Case/Tutor";
import {
  TutorGetAxios,
  TutorGetWithFavouriteAxios,
} from "../../component/Helper/AxiosFunction";
import { useState, useEffect } from "react";
import cookie from "js-cookie";

const TutorPage = (props) => {
  const [dynamicData, setDynamicData] = useState(props.cases);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = cookie.get("access_token");

        if (accessToken) {
          // Fetch data that requires the accessToken
          const response = await TutorGetWithFavouriteAxios();
          setDynamicData(response.data);
        }
      } catch (error) {
        console.error("Error fetching cases with favourites:", error);
        // Handle the error appropriately
        alert("Error fetching cases", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col mt-4  md:px-8 2xl:px-4 max-w-7xl mx-auto ">
      {props.cases.statusCode !== 500 && (
        <Tutor cases={dynamicData ? dynamicData : []} />
      )}
      {props.cases.statusCode == 500 && (
        <div className="flex justify-center">無法獲取任何數據</div>
      )}
    </div>
  );
};

export async function getStaticProps() {
  const response = await TutorGetAxios();

  return {
    props: {
      cases: response.data,
    },
    revalidate: 1, // This value is in seconds. Adjust it based on how frequently you want to regenerate the page.
  };
}

export default TutorPage;
