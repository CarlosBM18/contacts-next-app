import "../styles/globals.css";
import type { AppProps } from "next/app";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { isAuthRoute } from "../libs/utils";

const MyApp = observer(({ Component, pageProps }: AppProps) => {
  const { rootStore } = useStore();
  const router = useRouter();

  // Look for the token
  useEffect(() => {
    const getToken = async () => {
      const token = localStorage.getItem("token") || "";
      rootStore.appStore.setToken(token);
    };
    getToken();
  }, [rootStore.appStore]);

  // Redirect user to login if not logged
  useEffect(() => {
    if (!rootStore.appStore.isLogged) {
      router.replace("/login");
    }
  }, [
    rootStore.appStore.isLogged,
    rootStore.appStore.loadingUser,
    rootStore.appStore.token,
    router,
  ]);

  // Redirect user if tries to go to auth routes when logged
  useEffect(() => {
    if (isAuthRoute(router.pathname) && rootStore.appStore.isLogged) {
      router.replace("/");
    }
  }, [
    rootStore.appStore.isLogged,
    rootStore.appStore.loadingUser,
    rootStore.appStore.token?.length,
    router,
    router.pathname,
  ]);

  return <Component {...pageProps} />;
});

export default MyApp;
