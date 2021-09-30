import { observer } from "mobx-react-lite";
import Head from "next/head";
import router from "next/router";
import { BasicLayoutProps } from "../libs/types";
import { useStore } from "../stores";
import styles from "../styles/components/BasicLayout.module.css";
import { TextLink } from "./TextLink";

const BasicLayout = observer(({ title, children }: BasicLayoutProps) => {
  const { rootStore } = useStore();

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{title}</h1>
        </div>
        <div className={styles.content}>{children}</div>
      </main>

      <footer className={styles.footer}>
        <a>Creaded by CarlosBM</a>
        {rootStore.appStore.isLogged && (
          <div className={styles.logoutContainer}>
            <TextLink
              text="My account"
              onClick={() => {
                router.push("/my-account");
              }}
            />
          </div>
        )}
        {rootStore.appStore.isLogged && (
          <div className={styles.logoutContainer}>
            <TextLink text="Logout" onClick={rootStore.appStore.logout} />
          </div>
        )}
      </footer>
    </div>
  );
});

export { BasicLayout };
