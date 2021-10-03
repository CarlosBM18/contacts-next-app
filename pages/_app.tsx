import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AlertSystem } from "../components/AlertSystem";
import { BaseApp } from "../components/BaseApp";

const MyApp = (props: AppProps) => {
  return (
    <>
      <AlertSystem />
      <BaseApp {...props} />
    </>
  );
};

export default MyApp;
