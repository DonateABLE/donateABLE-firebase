import { Component, createElement, ReactNode } from "react";
import { classNames } from "utils";
import styles from "./style.scss";

interface Props {
    className?: string;
    noPadding?: boolean;
}
export default class Content extends Component<Props> {
    public render(): ReactNode {
        return (
            <div
                className={classNames(styles.content, this.props.className, {
                    [styles.noPadding]: this.props.noPadding,
                })}
            >
                {this.props.children}
            </div>
        );
    }
}

export class FullWidth extends Component<Props> {
    public render(): ReactNode {
        return (
            <div
                className={classNames(styles.fullWidth, this.props.className, {
                    [styles.noPadding]: this.props.noPadding,
                })}
            >
                {this.props.children}
            </div>
        );
    }
}
