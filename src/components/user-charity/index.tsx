import Icon from "components/icon";
import { createElement, FunctionComponent } from "react";
import styles from "./style.scss";
import Charity from "orm/charity";
import DonateABox from "components/donateabox";
import LabelCircle from "components/label-circle";

const defaultImg = () => {
    <DonateABox char={"D"} fontSize={"24"} />;
};

const UserCharityRank: FunctionComponent<{
    rank: number;
    className?: string;
    charity?: Charity;
}> = ({ rank, className, charity }) => {
    return (
        <div className={styles.container}>
            <div className={styles.rank}>
                <LabelCircle value={rank} />
            </div>
            <div className={styles.charityBox}>
                <div className={styles.logoContainer}>
                    <img
                        className={styles.logo}
                        src={charity ? charity.logo : undefined}
                    />
                </div>
                <div className={styles.charityInfo}>
                    Total Hashes Donated
                    <span className={styles.charityNumbers}> 123</span>
                </div>
                <div className={styles.charityInfo}>
                    Total Time Donated
                    <span className={styles.charityNumbers}> 456</span>
                </div>
            </div>
        </div>
    );
};

export default UserCharityRank;
