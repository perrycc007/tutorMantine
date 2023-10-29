import React from "react";
import { Container, Paper, Text } from "@mantine/core";
import classes from "./ResetPassword.module.css";

export default function InvalidResetLink() {
  return (
    <Container maxWidth="sm" className={classes.container}>
      <Paper className={classes.card}>
        <Text size="xl" weight={700}>
          重置鏈接無效
        </Text>
        <Text size="md">
          您使用的重置鏈接無效或已過期。請請求一個新的重置鏈接並重試。
        </Text>
      </Paper>
    </Container>
  );
}
