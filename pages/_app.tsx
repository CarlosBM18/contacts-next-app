import "../styles/globals.css";
import type { AppProps } from "next/app";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores";
import { useEffect } from "react";
import router from "next/router";

const MyApp = observer(({ Component, pageProps }: AppProps) => {
  const { rootStore } = useStore();

  useEffect(() => {
    const getToken = async () => {
      const token = localStorage.getItem("token") || "";
      rootStore.appStore.setToken(token);
    };
    getToken();
  }, [rootStore.appStore]);

  useEffect(() => {
    if (!rootStore.appStore.loadingUser && !rootStore.appStore.token?.length) {
      router.replace("/login");
    }
  }, [rootStore.appStore.loadingUser, rootStore.appStore.token]);

  return <Component {...pageProps} />;
});

export default MyApp;
