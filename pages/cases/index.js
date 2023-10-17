import axios from "axios";
import Student from "../../component/Case/Student";

const Cases = (props) => {
  return (
    <>
      <Student cases={props.cases} />
    </>
  );
};

export async function getStaticProps() {
  // fetch data from an API
  // const response = await axios.get(`http://localhost:3001/cases`);
  // const result = response ? response.data.result : "";
  const result = [
    {
      availtime: null,
      expectation: null,
      genderrequirement: "None",
      highestduration: 100,
      highestfee: 340,
      highestfrequency: 4,
      language: null,
      lastOnline: "2023-07-15T13:49:21.000Z",
      level: null,
      location: '["中半山","則魚涌"]',
      lowestduration: 75,
      lowestfee: 200,
      lowestfrequency: 1,
      others: "ff",
      status: "open",
      studentid: 44,
      subject: '["數學及統計學","地理","數學(M2)","中國文學","全科"]',
      userid: 1,
    },
    {
      availtime: null,
      expectation: null,
      genderrequirement: "None",
      highestduration: 100,
      highestfee: 340,
      highestfrequency: 4,
      language: null,
      lastOnline: "2023-07-15T13:49:21.000Z",
      level: null,
      location: '["中半山","則魚涌"]',
      lowestduration: 75,
      lowestfee: 200,
      lowestfrequency: 1,
      others: "ff",
      status: "open",
      studentid: 45,
      subject: '["數學及統計學","地理","數學(M2)","中國文學","全科"]',
      userid: 2,
    },
  ];

  return {
    props: {
      cases: result,
    },
    revalidate: 1,
  };
}

export default Cases;
