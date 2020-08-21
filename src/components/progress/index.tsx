import { createElement, FunctionComponent } from "react";
import { humanNumber, humanTime } from "utils";
import styles from "./style.scss";

interface Props {
    value: number;
    max: number;

    className?: string;
}

const offset = 1;
export const Progress: FunctionComponent<Props> = (props) => {
    const radius = 40;
    const outerWidth = 10;
    const innerWidth = 7;
    const circumference = 2 * Math.PI * (radius - outerWidth / 2);
    const percent = props.value / props.max;
    return (
        <svg className={props.className} height={radius * 2} width={radius * 2}>
            <circle
                className={styles.innerCircle}
                cx={radius}
                cy={radius}
                strokeWidth={innerWidth}
                r={radius - outerWidth / 2}
            />
            <circle
                className={styles.outerCircle}
                cx={radius}
                cy={radius}
                strokeWidth={outerWidth}
                r={radius - outerWidth / 2}
                strokeDasharray={
                    percent !== 1
                        ? `${percent * circumference}, ${circumference}`
                        : undefined
                }
                strokeDashoffset={offset}
            />
            <text
                className={styles.value}
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
            >
                {humanNumber(props.value)}
            </text>
        </svg>
    );
};

export const TimeProgress: FunctionComponent<Props> = (props) => {
    const radius = 40;
    const outerWidth = 10;
    const innerWidth = 7;
    const circumference = 2 * Math.PI * (radius - outerWidth / 2);
    const percent = props.value / props.max;
    return (
        <svg className={props.className} height={radius * 2} width={radius * 2}>
            <circle
                className={styles.innerCircle}
                cx={radius}
                cy={radius}
                strokeWidth={innerWidth}
                r={radius - outerWidth / 2}
            />
            <circle
                className={styles.outerCircle}
                cx={radius}
                cy={radius}
                strokeWidth={outerWidth}
                r={radius - outerWidth / 2}
                strokeDasharray={
                    percent !== 1
                        ? `${percent * circumference}, ${circumference}`
                        : undefined
                }
                strokeDashoffset={offset}
            />
            <text
                className={styles.value}
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
            >
                {humanTime(props.value)}
            </text>
        </svg>
    );
};
