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

  return (
    <>
      <section
      // className={classes.wrapper}
      >
        <Accordion>
          {props.cases
            ? _DATA
                .currentData()
                .map((oneCase) => (
                  <CaseItemUser
                    key={
                      props.type == "tutor"
                        ? oneCase.tutorid
                        : oneCase.studentid
                    }
                    id={
                      props.type == "tutor"
                        ? oneCase.tutorid
                        : oneCase.studentid
                    }
                    cases={oneCase}
                    type={props.type}
                    isFavourite={
                      props.favourite
                        ? props.favourite.includes(
                            props.type == "tutor"
                              ? oneCase.tutorid
                              : oneCase.studentid
                          )
                        : ""
                    }
                  />
                ))
            : []}
          {/* <div className={classes.pagination}> */}
        </Accordion>
        <Pagination
          total={count}
          page={page}
          onChange={handleChange}
          variant="outlined"
          color="primary"
        />
      </section>
    </>
  );
};

export default CaseListUser;
