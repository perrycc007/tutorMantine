import Tutor from "../../components/Case/Tutor";
import Axios from "axios";
import { TutorGet } from "../../component/Helper/AxiosFunction";
const TutorPage = (props) => {
  return (
    <>
      <Tutor cases={props.cases} />
    </>
  );
};

export async function getStaticProps() {
  // fetch data from an API
  const response = await TutorGet();
  const result = response ? response.data.result : "";
  return {
    props: {
      cases: result,
    },
    revalidate: 1,
  };
}

export default TutorPage;
