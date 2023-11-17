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
  // fetch data from an API
  // const response = await CaseGetAxios()
  // const result = response ? response.data.result : "";

  const response = await CaseGetAxios();
  // const response = await Axios.get(`http://localhost:3001/cases`);

  return {
    props: {
      cases: response.data,
    },
    revalidate: 1,
  };
}

export default Cases;
