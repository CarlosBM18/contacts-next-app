import React, { useEffect } from "react";
import { AppProps } from "next/dist/shared/lib/router/router";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores";
import { useRouter } from "next/router";
import { isAuthRoute } from "../libs/utils";
import { Spinner } from "./Spinner";

export const BaseApp = observer(({ Component, pageProps }: AppProps) => {
  const { rootStore } = useStore();
  const router = useRouter();

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

  return <Component {...pageProps} />;
});
