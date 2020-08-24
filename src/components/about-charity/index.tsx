import Charity from "orm/charity";
import { createElement, Fragment, FunctionComponent } from "react";
import styles from "./style.scss";

const AboutCharity: FunctionComponent<{ charity: Charity }> = ({ charity }) => (
    <Fragment>
        <div className={styles.about}>
            <h3>
                About
                <span className="light"> {charity.longName}</span>
            </h3>
            {charity.longDesc.split("\n").map((p, i) => (
                <p key={i}>{p}</p>
            ))}
            <h3>
                Contact <span className="light">{charity.longName}</span>
            </h3>
            <div className={styles.contact}>
                <div className={styles.section}>
                    <div>{charity.address}</div>
                    <div>{charity.cityProvince}</div>
                    <div>{charity.postalCode}</div>
                </div>

                <div className={styles.section}>
                    {charity.phone && (
                        <div>
                            <b>Phone:</b> {charity.phone}
                        </div>
                    )}
                    {charity.fax && (
                        <div>
                            <b>Fax:</b> {charity.fax}
                        </div>
                    )}
                    {charity.email && (
                        <div>
                            <b>Email:</b> {charity.email}
                        </div>
                    )}
                </div>

                <div className={styles.section}>
                    <h4>Office Hours</h4>
                    {charity.officeHourDays} from {charity.officeHourHours}
                </div>
            </div>
        </div>
    </Fragment>
);

export default AboutCharity;
