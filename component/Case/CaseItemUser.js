import classes from "./CaseItem.module.css";
import { Accordion, Button } from "@mantine/core";

import { useState, useEffect } from "react";
// import { IconHeart, IconHeartFilled } from "@tabler/icons";
import itemName from "./itemName";
function CaseItemUser(props) {
  const toggleFavoriteStatusHandler = () => {
    props.toggleFavourite(props.id);
  };

  let { location, subject, availtime, studentid, ...items } = props.cases;
  const fee = (items.highestfee + items.lowestfee) / 2;

  let heading = {
    location: JSON.parse(location),
    subject: JSON.parse(subject),
  };
  let verifyServer = "否";
  if (props.type == "tutor") {
    verifyServer = items.verify;
  }

  return (
    <Accordion.Item key={props.id} value={toString(props.id)}>
      <Accordion.Control>
        {props.id}
        {/* {Object.entries(heading).map(([key, value]) => (
          <p className={classes.title} key={`${itemName[key]}value`}>
            {typeof value == "object"
              ? value.map((item) => {
                  return ` ${item}`;
                })
              : ""}
          </p>
        ))}
        <p className={classes.title}>{`$${fee}/小時`}</p> */}
      </Accordion.Control>
      <Accordion.Panel>
        {props.type == "tutor" && <p>履歷驗證狀態:{verifyServer}</p>}
        <p className={classes.detail}>
          ID:{" "}
          {props.type == "tutor" ? props.cases.tutorid : props.cases.studentid}
        </p>
        {Object.entries(items).map(
          ([key, value]) =>
            itemName[key] !== undefined &&
            value !== null &&
            key !== "subgrade" && (
              <p className={classes.detail} key={itemName[key]}>
                {itemName[key]}: {value}
              </p>
            )
        )}
        {props.type == "tutor"
          ? JSON.parse(items.subgrade).map((item) => (
              <p className={classes.detail} key={item.id}>
                {item.id} : {item.value}
              </p>
            ))
          : ""}

        <Button
          variant="filled"
          onClick={
            props.type == "tutor"
              ? toggleFavoriteStatusHandler
              : toggleFavoriteStatusHandler
          }
        >
          {/* {props.isFavourite ? <IconHeartFilled /> : <IconHeart />} */}
        </Button>
      </Accordion.Panel>
    </Accordion.Item>
  );
}

export default CaseItemUser;
