import React, { useEffect, useState } from "react";
import { Accordion, Button, Pagination } from "@mantine/core";
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
                console.log(locations);
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
                return (
                  <Accordion.Item key={id} value={JSON.stringify(id)}>
                    <Accordion.Control>
                      {Object.entries(heading).map(([key, value]) => (
                        <p key={`${value} value`}>
                          {typeof value == "object"
                            ? value.map((item) => {
                                return ` ${item}`;
                              })
                            : ""}
                        </p>
                      ))}
                      <p>{`$${fee}/小時`}</p>
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
                        <EditForm
                          cases={oneCaseCopy}
                          studentId={oneCase.studentId}
                          updateStudentForm={props.updateStudentForm}
                        />
                      )}
                      {props.type == "tutor" || props.type == "cases" ? (
                        <Button
                          variant="transparent"
                          onClick={() => toggleFavoriteStatusHandler(id)}
                        >
                          {isFavourite ? <IconHeartFilled /> : <IconHeart />}
                        </Button>
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
