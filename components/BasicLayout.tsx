import Head from "next/head";
import { BasicLayoutProps } from "../libs/types";
import styles from "../styles/components/BasicLayout.module.css";

const BasicLayout = ({ title, children }: BasicLayoutProps) => {
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
        <a>Powered by CarlosBM</a>
      </footer>
    </div>
  );
};

export { BasicLayout };
