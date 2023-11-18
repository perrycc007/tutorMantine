import Tutor from "../../component/Case/Tutor";
import { TutorGetAxios } from "../../component/Helper/AxiosFunction";

import { CaseGetAxios } from "../../component/Helper/AxiosFunction";
const TutorPage = (props) => {
  return (
    <>
      <Tutor cases={props.cases} />
    </>
  );
};

export async function getStaticProps() {
  const response = await TutorGetAxios();
  return {
    props: {
      cases: response.data,
    },
    revalidate: 1,
  };
}

export default TutorPage;
