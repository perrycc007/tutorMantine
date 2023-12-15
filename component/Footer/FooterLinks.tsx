import { Text, Container, ActionIcon, Group, rem } from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";
import classes from "./FooterLinks.module.css";

const data = [
  {
    title: "平台介紹",
    links: [
      { label: "運作方式", link: "#" },
      { label: "尋找導師", link: "#" },
      { label: "尋找學生", link: "#" },
    ],
  },
  {
    title: "學習資源",
    links: [
      { label: "學習技巧", link: "#" },
      { label: "部落格", link: "#" },
      { label: "學習指南", link: "#" },
    ],
  },
  {
    title: "客戶支援",
    links: [
      { label: "聯絡我們", link: "#" },
      { label: "幫助中心", link: "#" },
    ],
  },
  {
    title: "法律信息",
    links: [
      { label: "服務條款", link: "#" },
      { label: "隱私政策", link: "#" },
      { label: "合規性", link: "#" },
    ],
  },
];

export function FooterLinks() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<"a">
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <div className="">
      <footer className={classes.footer}>
        <Container className={classes.inner}>
          <div className={classes.logo}>
            {/* <MantineLogo size={30} /> */}
            <Text size="xs" c="dimmed" className={classes.description}>
              每個學生的潛力都是無限的
            </Text>
          </div>
          <div className={classes.groups}>{groups}</div>
        </Container>
        <Container className={classes.afterFooter}>
          <Text c="dimmed" size="sm">
            © 2023 TUTOR.ELITE All rights reserved.
          </Text>

          <Group
            gap={0}
            className={classes.social}
            justify="flex-end"
            wrap="nowrap"
          >
            {/* <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandTwitter
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandYoutube
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandInstagram
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            </ActionIcon> */}
          </Group>
        </Container>
      </footer>
    </div>
  );
}
