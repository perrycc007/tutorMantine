import React, { useEffect, useState } from "react";
import { Accordion, Button } from "@mantine/core";

import itemName from "./itemName";
import classes from "./CaseItem.module.css";
import EditForm from "../Form/EditForm";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";

const CaseAccordion = (props) => {
  const oneCaseCopy = Object.assign({}, props.cases);
  let { locations, subjects, availtimes, ...items } = props.cases;
  const fee = (items.highestfee + items.lowestfee) / 2;
  const [isFavourite, setIsFavourite] = useState(
    props.cases.idfavorite ? true : false
  );
  let heading = {
    locations: locations ? locations.split(",") : [],
    subjects: subjects ? subjects.split(",") : [],
  };

  const id =
    props.cases.type == "tutor" ? props.cases.tutorid : props.cases.studentid;
  const toggleFavoriteStatusHandler = (id) => {
    props.toggleFavourite(isFavourite, id);
    setIsFavourite((prevState) => !prevState);
  };
  return (
    <>
      <section>
        <Accordion.Item key={id} value={JSON.stringify(id)}>
          <Accordion.Control>
            {Object.entries(heading).map(([key, value]) => (
              <p className={classes.title} key={`${itemName[key]}value`}>
                {value
                  ? value.map((item) => {
                      return ` ${item}`;
                    })
                  : ""}
              </p>
            ))}
            <p className={classes.title}>{`$${fee}/小時`}</p>
          </Accordion.Control>
          <Accordion.Panel>
            {props.type == "tutor" && <p>履歷驗證狀態:{props.verify}</p>}
            <p className={classes.detail}>ID:{id}</p>
            {Object.entries(props.cases).map(
              ([key, value]) =>
                itemName[key] !== undefined &&
                value !== null &&
                key !== "subgrade" && (
                  <p className={classes.detail} key={itemName[key]}>
                    {itemName[key]}: {value}
                  </p>
                )
            )}
            {props.type == "tutor" &&
              JSON.parse(oneCase.subgrade).map((item) => (
                <p className={classes.detail} key={item.id}>
                  {item.id} : {item.value}
                </p>
              ))}
            {props.type == "edit" && (
              <EditForm cases={oneCaseCopy} studentid={props.cases.studentid} />
            )}
            <Button
              variant="filled"
              onClick={() => toggleFavoriteStatusHandler(id)}
            >
              {isFavourite ? <IconHeartFilled /> : <IconHeart />}
            </Button>
          </Accordion.Panel>
        </Accordion.Item>
      </section>
    </>
  );
};

export default CaseAccordion;
