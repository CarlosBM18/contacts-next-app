import "../styles/globals.css";
import type { AppProps } from "next/app";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { isAuthRoute } from "../libs/utils";
import { AlertSystem } from "../components/AlertSystem";
import { Spinner } from "../components/Spinner";

const MyApp = observer(({ Component, pageProps }: AppProps) => {
  const { rootStore } = useStore();
  const router = useRouter();

  // Look for the token and user info
  useEffect(() => {
    rootStore.appStore.getToken(localStorage);
    rootStore.appStore.getUserInfo(localStorage);
  }, [rootStore.appStore]);

  // Redirect user to login if not logged
  useEffect(() => {
    if (!rootStore.appStore.isLogged && !isAuthRoute(router.pathname)) {
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

  // Return spinner when loading
  if (
    (rootStore.appStore.loadingUser || !rootStore.appStore.isLogged) &&
    !isAuthRoute(router.pathname)
  ) {
    return <Spinner />;
  }

  return (
    <>
      <AlertSystem />
      <Component {...pageProps} />
    </>
  );
});

export default MyApp;
