import { createElement, FunctionComponent } from "react";
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

const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

function humanNumber(value: number): string {
    // what tier? (determines SI symbol)
    const tier = (Math.log10(value) / 3) | 0;

    // if zero, we don't need a suffix
    if (tier === 0) {
        return value.toString();
    }

    // get suffix and determine scale
    const suffix = SI_SYMBOL[tier];
    const scale = Math.pow(10, tier * 3);

    // scale the number
    const scaled = value / scale;

    // format number and add suffix
    return scaled.toFixed(1) + suffix;
}

const TIME = ["S", "M", "H", "D"];
function humanTime(seconds: number): string {
    // Break points
    const minuteBP = 60;
    const hourBP = 3600;
    const dayBP = 86400;

    if (seconds > minuteBP && seconds < hourBP) {
        const minutes = Math.floor(seconds / minuteBP);
        return minutes.toFixed(0) + TIME[1];
    } else if (seconds > hourBP && seconds < dayBP) {
        const hours = Math.floor(seconds / hourBP);
        return hours.toFixed(0) + TIME[2];
    } else if (seconds > dayBP) {
        const days = Math.floor(seconds / dayBP);
        return days.toFixed(0) + TIME[3];
    } else {
        return seconds.toFixed(0) + TIME[0];
    }
}
