import { createElement, Fragment, FunctionComponent } from "react";
import styles from "./styles.scss";

const PrivacyPolicy: FunctionComponent = () => {
    return (
        <Fragment>
            <h1 className={styles.heading}>Privacy Policy</h1>
            <div className={styles.PrivacyPolicy}>
                <div className={styles.scroll}>
                    <strong> Effective Date: January 1st, 2020</strong>
                    <br />
                    <br />
                    This privacy notice discloses the privacy practices for
                    donateABLE and our website; https://www.donateable.ca. This
                    privacy notice applies solely to information collected by
                    this website, except where stated otherwise. It will notify
                    you of the following:
                    <ul>
                        <li>What information we collect;</li>
                        <li>With whom it is shared;</li>
                        <li>How it can be corrected;</li>
                        <li>How it is secured;</li>
                        <li>How policy changes will be communicated; and</li>
                        <li>
                            How to address concerns over misuse of personal
                            data.
                        </li>
                    </ul>
                    <strong>Information Collection, Use, and Sharing</strong>
                    <br />
                    We are the sole owners of the information collected on this
                    site. We only have access to/collect information that you
                    voluntarily give us via email or other direct contact from
                    you. We will not sell or rent this information to anyone.
                    <br />
                    <br />
                    We will use your information to respond to you, regarding
                    the reason you contacted us. We will not share your
                    information with any third party outside of our
                    organization.
                    <br />
                    <br />
                    Unless you ask us not to, we may contact you via email in
                    the future to tell you about statistics, new charities or
                    features, or changes to this privacy policy.
                    <br />
                    <br />
                    <strong>Your Access to and Control Over Information</strong>
                    <br />
                    You may opt out of any future contacts from us at any time.
                    You can do the following at any time by contacting us via
                    the contact form provided on our website:
                    <br />
                    <br />
                    <ul>
                        <li>See what data we have about you, if any.</li>
                        <li>Change/correct any data we have about you.</li>
                        <li>Have us delete any data we have about you.</li>
                        <li>
                            Express any concern you have about our use of your
                            data
                        </li>
                    </ul>
                    <br />
                    <br />
                    <strong>Security</strong>
                    <br />
                    We take precautions to protect your information. When you
                    submit sensitive information via the website, your
                    information is protected both online and offline.
                    <br />
                    <br />
                    While we use encryption to protect sensitive information
                    transmitted online, we also protect your information
                    offline. Only employees who need the information to perform
                    a specific job (e.g. billing or customer service) are
                    granted access to personally identifiable information. The
                    computers/servers on which we store personally identifiable
                    information are kept in a secure environment.
                    <br />
                    <br />
                    <strong>Cookies</strong>
                    <br />
                    We use “cookies” on this site. A cookie is a piece of data
                    stored on a site visitor’s hard drive to help us improve
                    your access to our site and identify repeat visitors to our
                    site. For instance, when we use a cookie to identify you,
                    you would not have to log in a password more than once,
                    thereby saving time while on our site. Cookies can also
                    enable us to track and target the interests of our users to
                    enhance their experience on our site. Usage of a cookie is
                    in no way linked to any personally identifiable information
                    on our site. Some of our business partners may use cookies
                    on our site (e.g., advertisers). However, we have no access
                    to or control over these cookies.
                    <br />
                    <br />
                    <strong>Links</strong>
                    <br />
                    This web site contains links to other sites. Please be aware
                    that we are not responsible for the content or privacy
                    practices of such other sites. We encourage our users to be
                    aware when they leave our site and to read the privacy
                    statements of any other site that collects personally
                    identifiable information.
                    <br />
                    <br />
                    <strong>
                        If you feel that we are not abiding by this privacy
                        policy, you should contact us immediately via email at
                        support@donateable.ca.
                    </strong>
                </div>
            </div>
        </Fragment>
    );
};

export default PrivacyPolicy;
