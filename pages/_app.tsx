import "@mantine/core/styles.css";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import { HeaderMegaMenu } from "../component/Header/HeaderMegaMenu";
import { FooterLinks } from "../component/Footer/FooterLinks";
import { useEffect } from "react";
import "./input.css";

import userStore from "../stores/stores";
import { isTokenExpired } from "../component/Helper/HelperFunction";
import cookie from "js-cookie";
export default function App({ Component, pageProps }: any) {
  const logout = userStore((state) => state.logoutuserId);
  const isLoggedin = userStore((state) => state.isLoggedin);
  useEffect(() => {
    const token = cookie.get("access_token"); // Function to get the token from cookies
    if ((!token && isLoggedin) || (isTokenExpired(token) && isLoggedin)) {
      logout(); // Function to log the user out
    }

    // const interval = setInterval(() => {
    //   const token = cookie.get("access_token");
    //   if ((!token && isLoggedin) || (isTokenExpired(token) && isLoggedin)) {
    //     logout();
    //   }
    // }, 60000); // Check every minute

    // return () => clearInterval(interval);
  }, []);

  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>Tutor Elite</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <HeaderMegaMenu />
      <div className="max-w-none px-3   2xl: max-w-7xl mx-auto  ">
        <Component {...pageProps} />
      </div>
      <FooterLinks />
    </MantineProvider>
  );
}
