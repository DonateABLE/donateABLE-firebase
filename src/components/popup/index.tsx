import { bind } from "decko";
import { Component, createElement, Fragment, ReactNode } from "react";
import { classNames, clickedOn } from "utils";
import styles from "./style.scss";

interface Props {
    openButton: ReactNode;
}

interface State {
    open: boolean;
}

export default class Popup extends Component<Props, State> {
    private popup: HTMLDivElement | null = null;

    constructor(props: Props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    public render(): ReactNode {
        return (
            <span className={styles.wrapper} onClick={this.open}>
                {this.props.openButton}
                <div
                    ref={(e) => (this.popup = e)}
                    className={classNames(styles.popup, {
                        [styles.open]: this.state.open,
                    })}
                >
                    {this.props.children}
                </div>
            </span>
        );
    }

    @bind
    private open(): void {
        this.setState({ open: true });
        document.body.addEventListener("click", this.onBodyClick);
    }

    @bind
    private onBodyClick(e: MouseEvent): void {
        if (clickedOn(e, this.popup)) {
            return;
        }
        this.setState({ open: false });
        document.body.removeEventListener("click", this.onBodyClick);
    }
}
