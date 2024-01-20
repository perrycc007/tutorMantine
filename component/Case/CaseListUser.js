import { useEffect, useState } from "react";
import CaseItemUser from "./CaseItemUser";
import { Pagination, Accordion, Button } from "@mantine/core";
import usePagination from "./usePagination";
import {} from "@mantine/core";

// And now we can use these
const CaseListUser = (props) => {
  let [page, setPage] = useState(1);
  const PER_PAGE = 15;
  const count =
    props.cases != undefined ? Math.ceil(props.cases.length / PER_PAGE) : 0;
  const _DATA = usePagination(props.cases, PER_PAGE);
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
    if (!props.admin) {
      handleClick();
    }
  };
  const items = props.cases
    ? _DATA.currentData().map((oneCase) => (
        <Accordion.Item key={oneCase.studentid} id={oneCase.studentid}>
          <Accordion.Control>1</Accordion.Control>
          <Accordion.Panel>1</Accordion.Panel>
        </Accordion.Item>
      ))
    : [];
  console.log(props.cases);

  return (
    <>
      <div
      // className={classes.wrapper}
      >
        <Accordion defaultValue={1}>{items}</Accordion>
        <Pagination
          total={count}
          page={page}
          onChange={handleChange}
          variant="outlined"
          color="primary"
        />
      </div>
    </>
  );
};

export default CaseListUser;
