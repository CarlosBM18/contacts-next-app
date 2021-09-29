import { observer } from "mobx-react-lite";
import Head from "next/head";
import { BasicLayoutProps } from "../libs/types";
import { useStore } from "../stores";
import styles from "../styles/components/BasicLayout.module.css";
import { TextLink } from "./TextLink";

const BasicLayout = observer(({ title, children }: BasicLayoutProps) => {
  const { rootStore } = useStore();

  const onLogout = () => {
    rootStore.appStore.saveToken("", localStorage);
  };

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
        {!!rootStore.appStore.token?.length && (
          <div className={styles.logoutContainer}>
            <TextLink text="Logout" onClick={onLogout} />
          </div>
        )}
      </footer>
    </div>
  );
});

export { BasicLayout };
