import {
  Title,
  SimpleGrid,
  Text,
  Button,
  ThemeIcon,
  Grid,
  rem,
} from "@mantine/core";
import {
  IconCpu,
  IconUserScan,
  IconCircleDotted,
  IconFileCode,
} from "@tabler/icons-react";
import classes from "./FeaturesTitle.module.css";

const features = [
  {
    icon: IconCpu,
    title: "個性化匹配",
    description:
      "透過我們獨特的算法，根據學生的學習需求和偏好，智能匹配最適合的導師",
  },
  {
    icon: IconFileCode,
    title: "豐富的導師資源庫",
    description: "包括來自各學科領域的資深導師，擁有豐富教學經驗和專業知識",
  },
  {
    icon: IconCircleDotted,
    title: "安全可靠",
    description: "我們重視每位用戶的安全和隱私，確保所有交流和個人信息的安全",
  },
  {
    icon: IconUserScan,
    title: "資質認證核實",
    description:
      "每位想要加入我們平台的導師必須經過評估程序。我們審核他們的學術和專業資格，以確保他們具備相應的教學能力和知識水平",
  },
];

export function FeaturesTitle() {
  const items = features.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon
        size={44}
        radius="md"
        variant="gradient"
        gradient={{ deg: 133, from: "blue", to: "cyan" }}
      >
        <feature.icon
          style={{ width: rem(26), height: rem(26) }}
          stroke={1.5}
        />
      </ThemeIcon>
      <Text fz="lg" mt="sm" fw={500}>
        {feature.title}
      </Text>
      <Text c="dimmed" fz="sm">
        {feature.description}
      </Text>
    </div>
  ));

  return (
    <div className="2xl: max-w-7xl mx-auto">
      <div className={classes.wrapper}>
        <Grid gutter={80}>
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Title className={classes.title} order={2}>
              我們的願景
            </Title>
            <Text c="dimmed">
              在這個知識迅速變遷的時代，我們相信每個學習者都應該獲得最適合自己的教育。我們的願景是打造一個無界限的學習平台，將專業導師和渴望學習的學生無縫連接，共同創造一個共享知識、激發潛能的社群。
            </Text>

            <button
            // variant="gradient"
            // gradient={{ deg: 133, from: "blue", to: "cyan" }}
            // size="lg"
            // radius="md"
            // mt="xl"
            >
              立即尋找
            </button>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 7 }}>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={30}>
              {items}
            </SimpleGrid>
          </Grid.Col>
        </Grid>
      </div>
    </div>
  );
}
