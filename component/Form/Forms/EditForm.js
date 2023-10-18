import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import StudentApply from "../../Form/StudentApply";
import classes from "./EditForm.module.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadois: 20,
  p: 4,
};

export default function EditForm(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        編輯
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.modalContainer}
      >
        <Box sx={style} className={classes.modalContent}>
          <StudentApply
            cases={props.cases}
            studentid={props.cases.studentid}
            type="history"
            closeModalHanlder={handleClose}
          ></StudentApply>
        </Box>
      </Modal>
    </div>
  );
}
