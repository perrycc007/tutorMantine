import React, { useState } from "react";
import { useRouter } from "next/router";
import { ResetPasswordAxios } from "../Helper/AxiosFunction";
import ResetComplete from "./ResetComplete";
import { Container, Paper, Text, TextInput, Button } from "@mantine/core";
import classes from "./ResetPassword.module.css";

const ResetPassword = () => {
  const router = useRouter();
  const { token, userid } = router.query;
  const [resetComplete, setResetComplete] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const isPasswordValid = (password) => {
    return password.length >= 6 && /\d/.test(password);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setError("");
    if (!isPasswordValid(password)) {
      setError("密碼必須超過6個字符並包含至少一個數字。");
      return;
    }

    if (password !== confirmPassword) {
      setError("密碼不匹配");
      return;
    }
    await ResetPasswordAxios(userid, token, password)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setResetComplete(true);
          router.push("/auth");
          return res.data;
        } else {
          let errorMessage = "重置失敗！";
          throw new Error(errorMessage);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
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
        {error && <div className="text-red-500">{error}</div>}
        <form onSubmit={submitHandler}>
          <TextInput
            required
            fullWidth
            margin="normal"
            label="新密碼"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextInput
            required
            fullWidth
            margin="normal"
            label="確認新密碼"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className={classes.buttonContainer}>
            <button type="submit" variant="outline" className={classes.button}>
              重設密碼
            </button>
          </div>
        </form>
      </Paper>
    </Container>
  );
};

export default ResetPassword;
