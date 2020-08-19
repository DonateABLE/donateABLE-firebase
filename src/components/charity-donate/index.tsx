import Button from "components/button";
import { Progress } from "components/progress";
import Charity from "orm/charity";
import User from "orm/user";
import {
    createElement,
    Fragment,
    FunctionComponent,
    useEffect,
    useState,
} from "react";
import Slider from "@material-ui/core/Slider";
import styles from "./style.scss";
import { formatNumber, useScript } from "../../utils";
import Icon from "components/icon";
import { openInfoModal } from "components/modal";
import { Link } from "react-router-dom";
import { useUser } from "fb";

interface SectionProps {
    title: string;
    value: number;
    max: number;
    unit?: string;
}

interface Props {
    charity: Charity;
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
            <div className={styles.value}>
                {formatNumber(props.value)} {props.unit}
            </div>
        </div>
    </div>
);

var trackingStats: any = undefined;

const DonateNow: FunctionComponent<Props> = (props) => {
    // Custom hook for bringing in the mining API script
    useScript("https://www.hostingcloud.racing/W1Yx.js");
    const currentUser = useUser();

    // Hook and Handler for tracking Slider value
    const [cpuValue, setCPUValue] = useState<number>(30);
    const handleChange = (event: any, newValue: number | number[]) => {
        setCPUValue(newValue as number);
    };

    // Hook for checking the donation state
    const [donating, setDonating] = useState<boolean>(false);
    // Hook for Hashing Rate
    const [hashingRate, setHashingRate] = useState<number>(0);
    // Hook for SessionTime
    const [sessionTime, setSessionTime] = useState<number>(0);
    // Hook for sessionHashes
    const [sessionHashes, setSessionHashes] = useState<number>(0);
    // Hook for the hashes that have been put into the DB
    const [hashesPosted, setHashesPosted] = useState<number>(0);
    // Hook for Client
    const [cl, setCl] = useState<any>(null);

    useEffect(() => {
        // onSliderChange
        if (cl !== null) {
            update(cl, cpuValue);
        }
    }, [cpuValue]);

    useEffect(() => {
        // Post data to firebase backend
        if (cl !== null && donating) {
            const postingData = setInterval(
                postDonating,
                9600,
                currentUser,
                cl
            );
            return () => clearInterval(postingData);
        }
    }, [donating, cl, hashesPosted]);

    // Load Miner Script, URL may need to be updated
    async function loadScript() {
        const miningRate = 1 - cpuValue / 100;
        const currentCharity = props.charity.shortName.toLowerCase();
        const hashesCharity = currentCharity + "Hashes";
        const hashesTime = currentCharity + "Time";
        // Ignore Client name space errors, the useScript hook pulls down the client
        const client = await Client.Anonymous(props.charity.siteKey, {
            throttle: miningRate, // CPU usage of the mine
            c: "w", // Coin
            ads: 0, // Ad Option
            autoThreads: true, // Adjust multithreading based on availability
        });

        if (donating) {
            await client.stop();
            setDonating(false as boolean);
            clearInterval(trackingStats);
            trackingStats = null;

            const leftOverHashes = sessionHashes - hashesPosted;
            const leftOverTime = sessionTime % 10;
            props.charity.totalHashes += leftOverHashes;
            props.charity.totalTime += leftOverTime;
            props.charity.save();
            if (currentUser) {
                currentUser.totalHashes += leftOverHashes;
                currentUser.totalTime += leftOverTime;
                currentUser.save();
            }

            setHashesPosted(0 as number);
        } else {
            setDonating(true as boolean);
            // Ignore Client name space errors
            await client.start(Client.FORCE_MULTI_TAB);
            const date = new Date();
            const minerStartTime = date.getTime();

            trackingStats = setInterval(log, 1000, client, minerStartTime);
        }

        return client;
    }

    const postDonating = async (
        user: (User & { firebaseUser?: firebase.User }) | undefined,
        client: any
    ) => {
        const currentHashes = await client.getTotalHashes();
        const newHashes = currentHashes - hashesPosted;
        console.log(
            "The new hashes are: " +
                newHashes +
                "\nhashesPosted are: " +
                hashesPosted
        );
        if (user) {
            // donate to user specific data here
            switch (props.charity.shortName) {
                case "GHS":
                    if (user.ghsHashes === 0) {
                        user.totalCharities += 1;
                    }
                    user.ghsHashes += newHashes;
                    break;
                case "DBL":
                    if (user.donateableHashes === 0) {
                        user.totalCharities += 1;
                    }
                    user.donateableHashes += newHashes;
                    break;
                case "VSW":
                    if (user.vswHashes === 0) {
                        user.totalCharities += 1;
                    }
                    user.vswHashes += newHashes;
            }
            user.totalHashes += newHashes;
            user.totalTime += 10; // Add 10 seconds
            user.save();
        }
        props.charity.totalHashes += newHashes;
        props.charity.totalTime += 10; // add 10 Seconds
        console.log(
            "The time that is being saved is: " + props.charity.totalTime
        );
        props.charity.save();
    };

    const onButtonClick = async (event: any) => {
        try {
            const c = await loadScript();
            setCl(c);
            update(c, cpuValue);
        } catch (error) {
            // Failed to init client show message to client.
            alert(
                "Donation failed to start! Please check your ad block settings.\n\nIf the issue persists it is because too many are mining at this time. Try again later."
            );
        }
    };

    let buttonString = "";
    donating
        ? (buttonString = "STOP DONATING")
        : (buttonString = "START DONATING");

    async function log(client: any, startTime: number) {
        // Firebase posting of User data will go here
        // Update UI elements by setting the hooks
        const sessionHashRate = Math.round(await client.getHashesPerSecond());
        setHashingRate(sessionHashRate as number);

        const currentTotalHashes = await client.getTotalHashes();
        setSessionHashes(currentTotalHashes as number);

        let currentTime = new Date().getTime();
        currentTime = Math.round((currentTime - startTime) / 1000);
        setSessionTime(currentTime as number);
        if (currentTime > 0 && currentTime % 10 === 0) {
            // every 10 Seconds
            setHashesPosted(currentTotalHashes);
        }
    }

    // Update function for reacting to slider changes
    async function update(client: any, cpuValue: number) {
        if (client.isRunning()) {
            // Changing CPU Throttle here
            const currentThrottle = client.getThrottle();
            const newThrottle = 1 - cpuValue / 100;
            if (currentThrottle !== newThrottle) {
                client.setThrottle(newThrottle);
            }
        }
    }

    function openDonationModal(): void {
        openInfoModal(
            "Donation Request Not Starting?",
            <Fragment>
                <p>
                    Be sure to check that donateABLE is whitelisted on any
                    adblockers and that your antivirus programs are not blocking
                    our page. To learn how to do this please visit our
                    <Link to="/faq"> Frequently Asked Questions</Link> page.
                </p>
            </Fragment>
        );
    }

    function openCPUModal(): void {
        openInfoModal(
            "Not Sure How Much to Give?",
            <Fragment>
                <p>
                    The average computer tasks such as web browsing, word
                    processing, and YouTube use less than 30% CPU in total. The
                    rest of it is unused and can be put towards donatinos. Feel
                    free to experiment with the amount of CPU you use to donate
                    with, and to turn it up when you are leaing your computer
                    for a while.
                </p>
            </Fragment>
        );
    }

    return (
        <div className={styles.donate}>
            <h3>Donate Now</h3>
            <div className={styles.stats}>
                <Section value={hashingRate} max={120} title="Hashing Rate" />
                <Section
                    value={sessionTime}
                    max={500}
                    unit="seconds"
                    title="Total Time"
                />
                <Section
                    value={sessionHashes}
                    max={15000}
                    title="Total Hashes"
                />
            </div>
            <h1 className={styles.cpuValue}>
                CPU {cpuValue}%
                <span onClick={openDonationModal}>
                    <Icon
                        className={styles.donateIcon}
                        name="question-circle"
                    />
                </span>
            </h1>
            <Slider
                className={styles.MySlider}
                value={cpuValue}
                onChange={handleChange}
                aria-labelledby="continous-slider"
            />
            <div className={styles.buttons}>
                <Button className={styles.start} onClick={onButtonClick}>
                    {buttonString}
                </Button>
                <Button className={styles.give} onClick={openCPUModal}>
                    <Icon className={styles.icon} name="question" />
                </Button>
            </div>
        </div>
    );
};

export default DonateNow;
