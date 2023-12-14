import { Container, Title, Text, Button, Group } from "@mantine/core";
import { Illustration } from "./Illustration";
import classes from "./NothingFoundBackground.module.css";
import { useRouter } from "next/router";
export default function Custom404() {
  const router = useRouter();
  const toHomePage = () => {
    router.push("/");
  };

  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
          <Text
            c="dimmed"
            size="lg"
            ta="center"
            className={classes.description}
          >
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Group justify="center">
            <button onClick={toHomePage} size="md">
              Take me back to home page
            </button>
          </Group>
        </div>
      </div>
    </Container>
  );
}
