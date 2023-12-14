import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
} from "@mantine/core";
import userStore from "../../stores/stores";
import { useRouter } from "next/router";
import Link from "next/link";
//   import { MantineLogo } from '@mantine/ds';
import { useDisclosure } from "@mantine/hooks";
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import classes from "./HeaderMegaMenu.module.css";
import cookie from "js-cookie";

const mockdata = [
  {
    icon: IconCode,
    title: "Open source",
    description: "This Pokémon’s cry is very loud and distracting",
  },
  {
    icon: IconCoin,
    title: "Free for everyone",
    description: "The fluid of Smeargle’s tail secretions changes",
  },
  {
    icon: IconBook,
    title: "Documentation",
    description: "Yanma is capable of seeing 360 degrees without",
  },
  {
    icon: IconFingerprint,
    title: "Security",
    description: "The shell’s rounded shape and the grooves on its.",
  },
  {
    icon: IconChartPie3,
    title: "Analytics",
    description: "This Pokémon uses its flying ability to quickly chase",
  },
  {
    icon: IconNotification,
    title: "Notifications",
    description: "Combusken battles with the intensely hot flames it spews",
  },
];

export function HeaderMegaMenu() {
  const Loggedin = userStore((state) => state.isLoggedin);
  const logOutAction = userStore((state) => state.logoutuserId);
  const cleanFavourite = userStore((state) => state.cleanFavourite);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const router = useRouter();
  const logoutHandler = () => {
    logOutAction();
    cleanFavourite();
    router.push("/");
    localStorage.removeItem("data");
    cookie.remove("access_token");
    localStorage.removeItem("loginTime");
  };

  const loginHandler = () => {
    closeDrawer();
    router.push("/auth");
  };
  useEffect(() => {
    setIsLoggedin(Loggedin);
  }, [Loggedin]);

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon
            style={{ width: rem(22), height: rem(22) }}
            color={theme.colors.blue[6]}
          />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box pb={0}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          {/* <MantineLogo size={30} /> */}

          <Group h="100%" gap={0} visibleFrom="sm">
            <Anchor className={classes.link} component={Link} href="/">
              Tutor Elite
            </Anchor>

            {/* <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Features
                    </Box>
                    <IconChevronDown
                      style={{ width: rem(16), height: rem(16) }}
                      color={theme.colors.blue[6]}
                    />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: "hidden" }}>
                <Group justify="space-between" px="md">
                  <Text fw={500}>Features</Text>
                  <Anchor href="#" fz="xs">
                    View all
                  </Anchor>
                </Group>

                <Divider my="sm" />

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>

                <div className={classes.dropdownFooter}>
                  <Group justify="space-between">
                    <div>
                      <Text fw={500} fz="sm">
                        Get started
                      </Text>
                      <Text size="xs" c="dimmed">
                        Their food sources have decreased, and their numbers
                      </Text>
                    </div>
                    <button  variant="default">Get started</button>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard> */}
            {isLoggedin && (
              <Anchor className={classes.link} component={Link} href="/apply">
                申請補習
              </Anchor>
            )}
            <Anchor className={classes.link} component={Link} href="/cases">
              補習個案
            </Anchor>
            <Anchor className={classes.link} component={Link} href="/tutor">
              精英導師
            </Anchor>
            {isLoggedin && (
              <Anchor className={classes.link} component={Link} href="/profile">
                個人資料
              </Anchor>
            )}
            {isLoggedin && (
              <Anchor
                className={classes.link}
                component={Link}
                href="/favourite"
              >
                我的最愛
              </Anchor>
            )}
            {isLoggedin && (
              <Anchor className={classes.link} component={Link} href="/history">
                申請歷史
              </Anchor>
            )}
          </Group>

          <Group visibleFrom="sm">
            {!isLoggedin ? (
              <button variant="default" onClick={loginHandler}>
                登入
              </button>
            ) : (
              <button onClick={logoutHandler}>登出</button>
            )}
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Tutor Elite"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          {/* <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.blue[6]}
              />
            </Center>
          </UnstyledButton> */}
          <Collapse in={linksOpened}>{links}</Collapse>
          <Anchor
            className={classes.link}
            component={Link}
            onClick={closeDrawer}
            href="/"
          >
            主頁
          </Anchor>
          {isLoggedin && (
            <Anchor
              className={classes.link}
              component={Link}
              onClick={closeDrawer}
              href="/apply"
            >
              申請補習
            </Anchor>
          )}
          <Anchor
            className={classes.link}
            component={Link}
            onClick={closeDrawer}
            href="/cases"
          >
            補習個案
          </Anchor>
          <Anchor
            className={classes.link}
            component={Link}
            onClick={closeDrawer}
            href="/tutor"
          >
            精英導師
          </Anchor>
          {isLoggedin && (
            <div>
              <Anchor
                className={classes.link}
                component={Link}
                onClick={closeDrawer}
                href="/profile"
              >
                個人資料
              </Anchor>
              <Anchor
                className={classes.link}
                component={Link}
                href="/favourite"
              >
                我的最愛
              </Anchor>
              <Anchor
                className={classes.link}
                component={Link}
                onClick={closeDrawer}
                href="/history"
              >
                申請歷史
              </Anchor>
            </div>
          )}
          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            {!isLoggedin ? (
              <button variant="default" onClick={loginHandler}>
                登入
              </button>
            ) : (
              <button onClick={logoutHandler}>登出</button>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
