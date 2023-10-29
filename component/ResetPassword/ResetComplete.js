import React from "react";
import { Container, Paper, Text } from "@mantine/core";
import styles from "./ResetPassword.module.css";

const ResetComplete = () => {
  return (
    <Container maxWidth="sm" className={styles.container}>
      <Paper className={styles.card}>
        <Text size="xl" weight={700}>
          密碼重置完成
        </Text>
        <Text size="md">您的密碼已成功重置。請使用您的登錄新密碼。</Text>
      </Paper>
    </Container>
  );
};

export default ResetComplete;
