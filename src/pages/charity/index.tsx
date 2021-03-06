import AboutCharity from "components/about-charity";
import Button from "components/button";
import DonateNow from "components/charity-donate";
import Content, { FullWidth } from "components/content";
import DonationTargets from "components/donation-targets";
import Icon from "components/icon";
import { PageLoader } from "components/loader";
import { openInfoModal } from "components/modal";
import { Tab, TabContainer } from "components/tabs";
import { bind } from "decko";
import { __, La } from "lang";
import Charity from "orm/charity";
import User from "orm/user";
import { useUser } from "fb";
import {
    Component,
    createElement,
    Fragment,
    FunctionComponent,
    ReactNode,
    useState,
    useEffect,
} from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import Statistics from "../../components/charity-stats";
import styles from "./style.scss";

type Props = RouteComponentProps<{ name: string }>;

interface State {
    charity?: Charity;
}

interface EditProps {
    charity?: Charity;
}

export default class CharityPage extends Component<Props, State> {
    private cancelCharity?: () => void;

    constructor(props: Props) {
        super(props);

        this.state = {
            charity: undefined,
        };
    }

    public componentDidMount(): void {
        this.cancelCharity = Charity.builder()
            .where("longName", "==", this.props.match.params.name)
            .subscribe((c) => this.setState({ charity: c[0] }));
    }

    public componentWillUnmount(): void {
        this.cancelCharity?.();
    }

    public render(): ReactNode {
        const charity = this.state.charity;
        if (charity === undefined) {
            return <PageLoader />;
        }
        return (
            <Content>
                <FullWidth className={styles.header}>
                    <img
                        className={styles.logo}
                        src={charity.logo}
                        alt={`${charity.longName} logo`}
                    />
                    <div className={styles.info}>
                        <h2 className={styles.name}>{charity.longName}</h2>
                        <div className={styles.tagLine}>{charity.tagline}</div>
                        <div className={styles.businessDescription}>
                            Registered Business Name{" "}
                            {charity.registeredBusinessName}
                        </div>
                        <div className={styles.businessDescription}>
                            Business Number {charity.businessNumber}
                        </div>
                    </div>
                    <div>
                        <a href={charity.canadaHelpsUrl}>
                            <Button
                                className={styles.makeDonation}
                                color="dark"
                                size="medium"
                            >
                                {__("charity.make-donation")}{" "}
                                <Icon name="external-link-alt" />
                            </Button>
                        </a>
                    </div>
                </FullWidth>
                <FullWidth className={styles.social}>
                    <div className={styles.link}>
                        <a href={charity.facebookUrl}>
                            <Icon className={styles.icon} name="facebook-f" />
                            <span className={styles.title}>
                                {__("charity.social.facebook.title")}
                            </span>
                        </a>
                    </div>
                    <div className={styles.link}>
                        <a href={charity.twitterUrl}>
                            <Icon className={styles.icon} name="twitter" />
                            <span className={styles.title}>
                                {__("charity.social.twitter.title")}
                            </span>
                        </a>
                    </div>
                    <div className={styles.link}>
                        <a href={charity.websiteUrl}>
                            <Icon className={styles.icon} name="globe" />
                            <span className={styles.title}>
                                {__("charity.social.website.title")}
                            </span>
                        </a>
                    </div>
                </FullWidth>
                <div className={styles.makeDonationLower}>
                    <a href={charity.canadaHelpsUrl}>
                        <Button
                            className={styles.button}
                            color="dark"
                            size="medium"
                        >
                            {__("charity.make-donation")}{" "}
                            <Icon name="external-link-alt" />
                        </Button>
                    </a>
                </div>
                <div className={styles.tabBar}>
                    <TabContainer>
                        <Tab className={styles.tabSelect} title={"Donate Now"}>
                            <DonateNow charity={charity} />
                        </Tab>
                        <Tab
                            className={styles.tabSelect}
                            title={__("charity.statistics")}
                        >
                            <Statistics charity={charity} />
                        </Tab>
                        <Tab
                            className={styles.tabSelect}
                            title={__("charity.donation-targets")}
                        >
                            <DonationTargets charity={charity} />
                        </Tab>
                        <Tab
                            className={styles.tabSelect}
                            title={__("charity.about")}
                        >
                            <AboutCharity charity={charity} />
                        </Tab>
                    </TabContainer>
                    `
                </div>
                <Edit charity={charity} />
            </Content>
        );
    }

    @bind
    private openHelpModal(): void {
        openInfoModal(
            "Donation Request Not Starting?",
            <Fragment>
                <p>
                    Be sure to check that donateABLE is whitelisted on any
                    adblockers and that your antivirus programs are not blocking
                    our page. To learn hot to do this please visit our{" "}
                    <Link to="/faq">Frequently Asked Questions</Link> page.
                </p>

                <Button fullWidth size="medium">
                    Continue
                </Button>
            </Fragment>
        );
    }
}

const Edit: FunctionComponent<EditProps> = (props) => {
    const currentUser = useUser();
    const [userEmail, setUserEmail] = useState<string>("");

    useEffect(() => {
        if (currentUser?.firebaseUser?.email) {
            setUserEmail(currentUser?.firebaseUser?.email as string);
        } else {
            setUserEmail("" as string);
        }
    }, [currentUser, userEmail]);

    if (userEmail === ("lp@lukepritchard.ca" || "rmacrae@synergenics.ca")) {
        return <Link to={`/charity/${props.charity?.id}/edit`}>Edit</Link>;
    } else {
        return null;
    }
};
