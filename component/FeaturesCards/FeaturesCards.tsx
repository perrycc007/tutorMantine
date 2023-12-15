import {
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { IconGauge, IconUser, IconBrandDatabricks } from "@tabler/icons-react";
import classes from "./FeaturesCards.module.css";

const mockdata = [
  {
    title: "來自薜學生的推薦",
    description:
      "非常感謝這個學生導師配對平台！自從我使用了這個服務後，我的學習效率和成績都有了顯著的提升",
    icon: IconGauge,
  },
  {
    title: "來自白媽媽的推薦",
    description:
      "平台上的導師既專業又耐心，他們根據我孩子的學習需求提供了量身定制的教學計劃",
    icon: IconUser,
  },
  {
    title: "來自張導師的推薦",
    description:
      "這個平台不僅提供了一個穩定而高效的工作環境，還讓我能夠接觸到來自各地不同背景的學生，這讓我的教學經驗更加豐富和多元化。",
    icon: IconBrandDatabricks,
  },
];

export function FeaturesCards() {
  const theme = useMantineTheme();
  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <feature.icon
        style={{ width: rem(50), height: rem(50) }}
        stroke={2}
        color={theme.colors.blue[6]}
      />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl">
      <Group justify="center">
        {/* <Badge variant="filled" size="lg">
          Best company ever
        </Badge> */}
      </Group>

      <Title order={2} className={classes.title} ta="center" mt="sm">
        我們的的信念
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        每個學生的潛力都是無限的，適合的導師可以激發他們最大的可能。我們在這裡，不僅是為了教育，更是為了啟發和改變。
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}
