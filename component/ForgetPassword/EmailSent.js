import React from "react";
import { Card, Text, Container, Paper } from "@mantine/core";
import styles from "./EmailSent.module.css";

export default function EmailSent() {
  return (
    <Container className={styles.container}>
      <Paper className={styles.card}>
        <Card shadow="xs">
          <Text size="xl" weight={700}>
            郵件已發送！
          </Text>
          <Text size="md">
            一封包含如何重置密碼說明的電子郵件已發送到您的電子郵件地址。
            請檢查您的收件箱並按照提供的說明進行操作。
          </Text>
        </Card>
      </Paper>
    </Container>
  );
}
