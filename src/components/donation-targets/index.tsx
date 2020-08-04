import Icon from "components/icon";
import Progress from "components/progress";
import Charity, { DonationTarget } from "orm/charity";
import { createElement, FunctionComponent } from "react";
import { cadToHashes, formatCurrency, formatNumber } from "utils";
import styles from "./style.scss";

interface SectionProps {
    target: DonationTarget;
}

const Section: FunctionComponent<SectionProps> = ({ target }) => (
    <div className={styles.section}>
        <div className={styles.iconWrapper}>
            <Icon className={styles.icon} name={target.icon} />
        </div>
        <div className={styles.content}>
            <div className={styles.title}>{target.name}</div>
            <div className={styles.cost}>
                Cost = {formatCurrency(target.cost)} ={" "}
                {formatNumber(cadToHashes(target.cost))} hashes
            </div>
            <p className={styles.description}>{target.description}</p>
        </div>
    </div>
);

interface Props {
    charity: Charity;
}
const DonationTargets: FunctionComponent<Props> = (props) => (
    <div className={styles.stats}>
        <h3>
            {props.charity.longName}{" "}
            <span className="light">Donation Targets</span>
        </h3>
        <div className={styles.grid}>
            {props.charity.donationTargets.map((target) => (
                <Section key={target.name} target={target} />
            ))}
        </div>
    </div>
);

export default DonationTargets;
