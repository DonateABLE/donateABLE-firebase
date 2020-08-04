import { createElement, FunctionComponent } from "react";
import styles from "./style.scss";

interface Props {
    value: number;
    max: number;

    className?: string;
}

const offset = 1;
const Progress: FunctionComponent<Props> = (props) => {
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

export default Progress;

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
