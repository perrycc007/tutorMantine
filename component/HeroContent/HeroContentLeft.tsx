import { Overlay, Container, Title, Button, Text } from "@mantine/core";
import classes from "./HeroContentLeft.module.css";

export function HeroContentLeft() {
  return (
    <div className="w-screen">
      <div className={classes.hero}>
        <Overlay
          gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 60%)"
          opacity={0.6}
          zIndex={0}
        />
        <Container className={classes.container} size="md">
          <Title className={classes.title}>快速並免費地找到你的導師</Title>
          <Button
            // variant="gradient"
            // size="xl"
            // radius="xl"
            className={classes.control}
          >
            立即尋找
          </Button>
        </Container>
      </div>
    </div>
  );
}
