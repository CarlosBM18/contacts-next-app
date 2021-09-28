import "../styles/globals.css";
import type { AppProps } from "next/app";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores";
import { BasicLayout } from "../components/BasicLayout";
import { useEffect } from "react";
import router from "next/router";
const MyApp = observer(({ Component, pageProps }: AppProps) => {
  const { rootStore } = useStore();

  useEffect(() => {
    if (!rootStore.appStore.loadingUser && !rootStore.appStore.token?.length) {
      router.replace("/login");
    }
  }, [rootStore.appStore.loadingUser, rootStore.appStore.token]);

  if (rootStore.appStore.loadingUser) {
    return (
      <BasicLayout title="Loading">
        <div>...</div>
      </BasicLayout>
    );
  }

  return <Component {...pageProps} />;
});

export default MyApp;
