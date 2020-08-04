import { createElement, FunctionComponent } from "react";
import styles from "./style.scss";

export const PageLoaderChanged: FunctionComponent = (props) => (
    <div className={styles.loading + " " + styles.pages} />
);
