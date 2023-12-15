import React, { useEffect, useState } from "react";
import { Accordion, Button, Pagination, Switch } from "@mantine/core";
import usePagination from "./usePagination";
import itemName from "./itemName";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import EditForm from "../Form/EditForm";
const CaseAccordion = (props) => {
  const [favourites, setFavourites] = useState(
    props.cases.map((cases) => (cases.idfavourite ? true : false))
  );
  const [page, setPage] = useState(1);
  const PER_PAGE = 15;
  const [status, setStatus] = useState(
    props.cases.map((cases) => (cases.status == "OPEN" ? true : false))
  );
  const count =
    props.cases !== undefined ? Math.ceil(props.cases.length / PER_PAGE) : 0;
  const _DATA = usePagination(props.cases, PER_PAGE);
  const statusHandler = (index, openStatus) => {
    const updatedStatus = [...status];
    updatedStatus[index] = openStatus;
    setStatus(updatedStatus);
  };
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

  const toggleFavoriteStatusStateyHandler = (index) => {
    // Update the favourites array
    const updatedFavourites = [...favourites];
    updatedFavourites[index] = !updatedFavourites[index];
    setFavourites(updatedFavourites);
  };
  useEffect(() => {
    setFavourites(
      props.cases.map((cases) => (cases.idfavourite ? true : false))
    );
  }, [props.cases]);
  return (
    <>
      <section>
        <Accordion variant="separated">
          {props.cases
            ? _DATA.currentData().map((oneCase, index) => {
                const oneCaseCopy = Object.assign({}, oneCase);

                let {
                  locations,
                  subjects,
                  availtimes,
                  subjectGrade,
                  ...items
                } = oneCase;
                const fee = (items.highestfee + items.lowestfee) / 2;
                const isFavourite = favourites[index];
                const isStatus = status[index];
                let heading = {
                  locations: locations
                    ? Array.isArray(locations)
                      ? locations
                      : locations.split(",")
                    : [],
                  subjects: subjects
                    ? Array.isArray(subjects)
                      ? subjects
                      : subjects.split(",")
                    : [],
                };
                const id =
                  props.type == "tutor" ? oneCase.tutorId : oneCase.studentId;
                let verifyServer = "否";
                if (oneCase.type == "tutor") {
                  verifyServer = items.verify;
                }
                const toggleFavoriteStatusHandler = (id) => {
                  props.toggleFavourite(id, isFavourite);
                  toggleFavoriteStatusStateyHandler(index);
                };
                const toggleCaseStatusHandler = (id, status) => {
                  props.toggleStatus(
                    id,
                    status == "OPEN" ? "OPEN" : "CLOSE",
                    "cases"
                  );
                  statusHandler(index, status == "OPEN" ? true : false);
                };
                return (
                  <Accordion.Item key={id} value={JSON.stringify(id)}>
                    <Accordion.Control>
                      <div className="block sm:grid grid-cols-3 gap-4   ">
                        {Object.entries(heading).map(([key, value]) => (
                          <p key={`${value} value`} className="">
                            {typeof value == "object"
                              ? value.map((item) => {
                                  return ` ${item}`;
                                })
                              : ""}
                          </p>
                        ))}
                        <p>{`$${fee}/小時`}</p>
                      </div>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <p>ID:{id}</p>
                      {props.type == "tutor" && (
                        <p>履歷驗證狀態:{oneCase.verify}</p>
                      )}
                      {Object.entries(oneCase).map(
                        ([key, value]) =>
                          itemName[key] !== undefined &&
                          value !== null &&
                          key !== "subjectGrade" && (
                            <p key={itemName[key]}>
                              {itemName[key]}: {value}
                            </p>
                          )
                      )}
                      {oneCase.type == "tutor" &&
                        JSON.parse(oneCase.subgrade).map((item) => (
                          <p key={item.id}>
                            {item.id} : {item.value}
                          </p>
                        ))}
                      {props.type == "edit" && (
                        <div>
                          <Switch
                            checked={isStatus}
                            label={
                              oneCase.status == "BLOCKED"
                                ? "您目前被封鎖"
                                : "開放申請"
                            }
                            disabled={
                              oneCase.status == "BLOCKED" ? true : false
                            }
                            onChange={(event) =>
                              toggleCaseStatusHandler(
                                id,
                                event.currentTarget.checked
                              )
                            }
                          />
                          <EditForm
                            cases={oneCaseCopy}
                            studentId={oneCase.studentId}
                            updateStudentForm={props.updateStudentForm}
                          />
                        </div>
                      )}
                      {props.type == "tutor" || props.type == "cases" ? (
                        <button
                          variant="transparent"
                          onClick={() => toggleFavoriteStatusHandler(id)}
                        >
                          {isFavourite ? <IconHeartFilled /> : <IconHeart />}
                        </button>
                      ) : (
                        ""
                      )}
                    </Accordion.Panel>
                  </Accordion.Item>
                );
              })
            : []}
        </Accordion>
        <div className="flex justify-center mt-8">
          <Pagination
            total={count}
            page={page}
            onChange={handleChange}
            variant="outlined"
            color="primary"
          />
        </div>
      </section>
    </>
  );
};

export default CaseAccordion;
