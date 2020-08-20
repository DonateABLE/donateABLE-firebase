import Icon from "components/icon";
import { createElement, FunctionComponent } from "react";
import styles from "./style.scss";
import Charity from "orm/charity";
import { useUser } from "fb";
import { get } from "lodash";
import DonateABox from "components/donateabox";
import LabelCircle from "components/label-circle";
import { humanNumber, humanTime } from "utils";

const defaultImg = () => {
    <DonateABox char={"D"} fontSize={"24"} />;
};

const UserCharityRank: FunctionComponent<{
    rank: number;
    className?: string;
    charity?: Charity;
}> = ({ rank, className, charity }) => {
    const user = useUser();
    const currentCharityHashes = charity?.shortName.toLowerCase() + "Hashes";
    const currentCharityTime = charity?.shortName.toLowerCase() + "Time";

    const userHashes: number = Number(get(user, currentCharityHashes));
    const userTime: number = Number(get(user, currentCharityTime));
    const formattedHashes: string = humanNumber(userHashes);
    const formattedTime: string = humanTime(userTime);

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
                    <span className={styles.charityNumbers}>
                        {" "}
                        {formattedHashes}
                    </span>
                </div>
                <div className={styles.charityInfo}>
                    Total Time Donated
                    <span className={styles.charityNumbers}>
                        {" "}
                        {formattedTime}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default UserCharityRank;
