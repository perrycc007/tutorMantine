import { Overlay, Container, Title, Button, Text } from "@mantine/core";
import classes from "./HeroContentLeft.module.css";

export function HeroContentLeft() {
  return (
    <div className="w-screen">
      <div className={classes.hero}>
        <Overlay
          gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
          opacity={1}
          zIndex={0}
        />
        <Container className={classes.container} size="md">
          <Title className={classes.title}>
            A fully featured React components library
          </Title>
          <Text className={classes.description} size="xl" mt="xl">
            Build fully functional accessible web applications faster than ever
            – Mantine includes more than 120 customizable components and hooks
            to cover you in any situation
          </Text>

          <button
            variant="gradient"
            size="xl"
            radius="xl"
            className={classes.control}
          >
            Get started
          </button>
        </Container>
      </div>
    </div>
  );
}
