import classes from "./CaseItem.module.css";
import { Accordion, Button } from "@mantine/core";

import { useState, useEffect } from "react";
// import { IconHeart, IconHeartFilled } from "@tabler/icons";
import itemName from "./itemName";
function CaseItemUser(props) {
  const toggleFavoriteStatusHandler = () => {
    props.toggleFavourite(props.id);
  };

  // const item = Object.entries(items).map((key, value) => {
  //   return key;
  // });

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
    <div
    // className={classes.item}
    >
      <Accordion.Item key={1} value={1}>
        <Accordion.Control>
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
          1
        </Accordion.Control>
      </Accordion.Item>
    </div>
  );
}

export default CaseItemUser;
