import Student from "../../component/Case/Student";
import { CaseGetAxios } from "../../component/Helper/AxiosFunction";
const Cases = (props) => {
  return (
    <>
      <Student cases={props.cases} />
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
