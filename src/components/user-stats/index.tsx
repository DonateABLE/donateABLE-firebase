import { TimeProgress, Progress } from "components/progress";
import User from "orm/user";
import { createElement, FunctionComponent } from "react";
import { formatNumber, secondsToString } from "utils";
import styles from "./style.scss";

interface SectionProps {
    title: string;
    value: number;
    max: number;
}

interface Props {
    user: User;
}

const Section: FunctionComponent<SectionProps> = (props) => (
    <div className={styles.section}>
        <Progress
            className={styles.loader}
            value={props.value}
            max={props.max}
        />
        <div className={styles.content}>
            <div className={styles.title}>{props.title}</div>
            <div className={styles.value}>{formatNumber(props.value)}</div>
        </div>
    </div>
);

const TimeSection: FunctionComponent<SectionProps> = (props) => (
    <div className={styles.section}>
        <TimeProgress
            className={styles.loader}
            value={props.value}
            max={props.max}
        />
        <div className={styles.content}>
            <div className={styles.title}>{props.title}</div>
            <div className={styles.value}>{secondsToString(props.value)}</div>
        </div>
    </div>
);

const UserStatistics: FunctionComponent<Props> = (props) => (
    <div className={styles.stats}>
        <h3>{props.user.fullName}'s Statistics</h3>
        <div className={styles.grid}>
            <Section
                value={props.user.totalHashes}
                max={100000}
                title="Total Hashes to Date"
            />
            <Section
                value={props.user.totalCharities}
                max={3}
                title="Total Charities"
            />
            <TimeSection
                value={props.user.totalTime}
                max={3}
                title="Total Time Donated"
            />
        </div>
    </div>
);

export default UserStatistics;
