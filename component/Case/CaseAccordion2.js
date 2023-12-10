import React, { useEffect, useState } from "react";
import { Accordion, Button, Pagination } from "@mantine/core";
import usePagination from "./usePagination";
import itemName from "./itemName";
import classes from "./CaseItem.module.css";

const CaseAccordion = (props) => {
  const [page, setPage] = useState(1);
  const PER_PAGE = 15;

  const count =
    props.cases !== undefined ? Math.ceil(props.cases.length / PER_PAGE) : 0;
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
      <section>
        <Accordion>
          {props.cases
            ? _DATA.currentData().map((oneCase) => {
                let {
                  locations,
                  subjects,
                  availtimes,
                  subjectGrade,
                  ...items
                } = oneCase;
                const fee = (items.highestfee + items.lowestfee) / 2;
                console.log(oneCase);
                let heading = {
                  locations: locations ? locations.split(",") : [],
                  subjects: subjects ? subjects.split(",") : [],
                };
                const id =
                  props.type == "tutor" ? oneCase.tutorId : oneCase.studentId;
                let verifyServer = "否";
                if (oneCase.type == "tutor") {
                  verifyServer = items.verify;
                }
                const toggleFavoriteStatusHandler = (id) => {
                  props.toggleFavourite(id);
                };
                return (
                  <Accordion.Item
                    key={oneCase.studentid}
                    value={JSON.stringify(oneCase)}
                  >
                    <Accordion.Control>
                      {Object.entries(heading).map(([key, value]) => (
                        <p
                          className={classes.title}
                          key={`${itemName[key]}value`}
                        >
                          {typeof value == "object"
                            ? value.map((item) => {
                                return ` ${item}`;
                              })
                            : ""}
                        </p>
                      ))}
                      <p className={classes.title}>{`$${fee}/小時`}</p>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <p className={classes.detail}>ID:{id}</p>
                      {props.type == "tutor" && (
                        <p>履歷驗證狀態:{oneCase.verify}</p>
                      )}
                      {Object.entries(oneCase).map(
                        ([key, value]) =>
                          itemName[key] !== undefined &&
                          value !== null &&
                          key !== "subjectGrade" && (
                            <p className={classes.detail} key={itemName[key]}>
                              {itemName[key]}: {value}
                            </p>
                          )
                      )}
                      {oneCase.type == "tutor" &&
                        JSON.parse(oneCase.subgrade).map((item) => (
                          <p className={classes.detail} key={item.id}>
                            {item.id} : {item.value}
                          </p>
                        ))}
                      {props.type == "edit" && (
                        <EditForm
                          cases={oneCaseCopy}
                          studentId={oneCase.studentId}
                          updateStudentForm={props.updateStudentForm}
                        />
                      )}
                      {/* <Button variant="filled">
                     {/* {oneCase.isFavourite ? <IconHeartFilled /> : <IconHeart />}  */}
                      {/* </Button>  */}
                    </Accordion.Panel>
                  </Accordion.Item>
                );
              })
            : []}
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

export default CaseAccordion;
