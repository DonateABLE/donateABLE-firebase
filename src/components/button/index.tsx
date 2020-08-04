import { createElement, FunctionComponent } from "react";
import { classNames } from "utils";
import styles from "./style.scss";

interface Props {
    className?: string;
    color?: "light" | "dark" | "white" | "danger";
    size?: "small" | "medium" | "large";
    clear?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    fullWidth?: boolean;
}

const Button: FunctionComponent<Props> = (props) => (
    <button
        className={classNames(
            styles.button,
            styles[props.color ?? "light"],
            styles[props.size ?? "small"],
            props.className,
            {
                [styles.fullWidth]: props.fullWidth,
                [styles.clear]: props.clear,
            }
        )}
        onClick={props.onClick}
    >
        {props.children}
    </button>
);

export default Button;
