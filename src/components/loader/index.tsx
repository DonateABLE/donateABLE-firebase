import { createElement, FunctionComponent } from "react";
import styles from "./style.scss";

export const PageLoader: FunctionComponent = (props) => (
    <div className={styles.loader + " " + styles.page} />
);
