import React, { useState, useRef } from "react";
import { resetPasswordLinkAxios as resetPasswordLink } from "../Helper/AxiosFunction.js";
import { Container, Paper, Text, TextInput, Button } from "@mantine/core";
import classes from "./ForgetPassword.module.css";
import EmailSent from "./EmailSent";

const ResetPasswordLink = () => {
  const emailInputRef = useRef();
  const [emailSentState, setEmailSentState] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    resetPasswordLink(enteredEmail)
      .then((res) => {
        if (res.data !== "user not found") {
          setEmailSentState(true);
        } else {
          throw new Error("User is not registered");
        }
      })
      .catch((err) => {
        alert(`Error: ${err.message}`);
      });
  };

  return (
    <Container className={classes.container}>
      {emailSentState && <EmailSent />}
      {!emailSentState && (
        <Paper className={classes.card}>
          <Text size="xl" weight={700}>
            忘記密碼
          </Text>
          <Text size="md">請輸入你登記的電郵地址</Text>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextInput
              label="電郵"
              variant="outlined"
              fullWidth
              inputRef={emailInputRef}
              className={classes.email}
            />
            <button type="submit" variant="outline" className={classes.button}>
              發送重置鏈接
            </button>
          </form>
        </Paper>
      )}
    </Container>
  );
};

export default ResetPasswordLink;
