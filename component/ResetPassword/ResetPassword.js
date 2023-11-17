import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import ResetPasswordAxios from "../Helper/AxiosFunction";
import ResetComplete from "./ResetComplete";
import { Container, Paper, Text, TextInput, Button } from "@mantine/core";
import classes from "./ResetPassword.module.css";

const ResetPassword = () => {
  const router = useRouter();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const { token } = router.query;
  const { userid } = router.query;
  const [resetComplete, setResetComplete] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    if (enteredPassword === enteredConfirmPassword) {
      ResetPasswordAxios(userid, token, enteredPassword)
        .then((res) => {
          if (res.status === 200) {
            setResetComplete(true);
            return res.data;
          } else {
            return res.then((data) => {
              let errorMessage = "重置失敗！";
              throw new Error(errorMessage);
            });
          }
        })
        .then((res) => {
          //   router.push("/");
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      alert("密碼不匹配");
    }
  };

  if (resetComplete) {
    return <ResetComplete />;
  }

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Paper className={classes.card}>
        <Text size="xl" weight={700}>
          重置你的密碼
        </Text>
        <form onSubmit={submitHandler}>
          <TextInput
            required
            fullWidth
            margin="normal"
            label="新密碼"
            type="password"
            inputRef={passwordInputRef}
          />
          <TextInput
            required
            fullWidth
            margin="normal"
            label="確認新密碼"
            type="password"
            inputRef={confirmPasswordInputRef}
          />
          <div className={classes.buttonContainer}>
            <Button type="submit" variant="outline" className={classes.button}>
              重設密碼
            </Button>
          </div>
        </form>
      </Paper>
    </Container>
  );
};

export default ResetPassword;
