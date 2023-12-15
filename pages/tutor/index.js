import Tutor from "../../component/Case/Tutor";
import {
  TutorGetAxios,
  TutorGetWithFavouriteAxios,
} from "../../component/Helper/AxiosFunctionOld";
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
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Tutor cases={dynamicData} />
    </>
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
