import React, { useRef } from "react";
import Axios from "axios";
import { Button, Box, TextField, Typography, Modal } from "@mui/material";
import classes from "./ResetPasswordForm.module.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadois: 20,
  p: 4,
};

const ResetPasswordForm = (props) => {
  const [open, setOpen] = React.useState(false);
  const passwordInputRef = useRef();
  const ConfirmPasswordInputRef = useRef();

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 5);
  };
  const handleClose = () => {
    setOpen(false);
    // setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 5);
  };

  const ResetPasswordHandler = (event) => {
    event.preventDefault();
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = ConfirmPasswordInputRef.current.value;
    console.log(passwordInputRef.current.value);
    async function ResetPassword() {
      const res = await Axios.post(
        `http://localhost:3001/resetPassword/${props.userid}`,
        {
          password: enteredPassword,
        }
      );
      return res;
    }
    if (enteredPassword == enteredConfirmPassword) {
      ResetPassword()
        .then((res) => {
          if (res.status == 200) {
            alert("成功");
            handleClose();
            return res.data;
          } else {
            return res.then((data) => {
              let errorMessage = "重置失敗！";
              throw new Error(errorMessage);
            });
          }
        })
        .then((res) => {})
        .catch((err) => {
          alert(err.message);
        });
    } else {
      alert("密碼不匹配");
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        更改密碼
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.modalContainer}
      >
        <Box sx={style} className={classes.modalContent}>
          <Typography variant="h5" gutterBottom>
            重置你的密碼
          </Typography>
          <form onSubmit={ResetPasswordHandler}>
            <TextField
              required
              fullWidth
              margin="normal"
              label="新密碼"
              type="password"
              inputRef={passwordInputRef}
            />
            <TextField
              required
              fullWidth
              margin="normal"
              label="確認新密碼"
              type="password"
              inputRef={ConfirmPasswordInputRef}
            />
            <div className={classes.buttonContainer}>
              <button type="submit" className={classes.button}>
                重設密碼
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
export default ResetPasswordForm;
