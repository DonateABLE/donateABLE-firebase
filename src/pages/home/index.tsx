import Button from "components/button";
import Content from "components/content";
import SearchBar, { SearchQuery } from "components/search-bar";
import TextBox from "components/textbox";
import { useUser } from "fb";
import Charity from "orm/charity";
import CharityType from "orm/charity-type";
import { useQuery } from "orm/model";
import { createElement, Fragment, FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import { formatNumber } from "utils";
import CharityBox from "./charity";
import styles from "./style.scss";

const LoginButtons: FunctionComponent = () => {
    if (useUser()) {
        return (
            <Fragment>
                <Link to="/login">
                    <Button className={styles.groupElement} color="dark">
                        Sign Out
                    </Button>
                </Link>
            </Fragment>
        );
    } else {
        return (
            <Fragment>
                <Link to="/login">
                    <Button className={styles.groupElement} color="white">
                        Login
                    </Button>
                    <Button className={styles.groupElement} color="dark">
                        Sign Up
                    </Button>
                </Link>
            </Fragment>
        );
    }
};

const Home: FunctionComponent = () => {
    const charities = useQuery(Charity.builder().orderBy("longName")) ?? [];
    const charityTypes = useQuery(CharityType.builder().orderBy("name")) ?? [];
    const [query, setQuery] = useState<SearchQuery>({
        search: "",
        charityTypes: [],
    });

    const sumHashes =
        (charities[0]?.totalHashes +
            charities[1]?.totalHashes +
            charities[2]?.totalHashes) |
        0;
    const sumCurrentlyDonating =
        (charities[0]?.currentlyDonating +
            charities[1]?.currentlyDonating +
            charities[2]?.currentlyDonating) |
        0;
    const sumDonatorsToDate =
        (charities[0]?.donatorsToDate +
            charities[1]?.donatorsToDate +
            charities[2]?.donatorsToDate) |
        0;

    return (
        <Fragment>
            <div className={styles.top}>
                <h2 className={styles.heading}>
                    <span className={styles.light}>
                        Support local charities in Guelph
                    </span>{" "}
                    <br />
                    without opening your wallet
                </h2>
                <div className={styles.buttonGroup}>
                    <TextBox className={styles.groupElement}>
                        Currently Donating
                        <span className={styles.value}>
                            {sumCurrentlyDonating.toString()}
                        </span>
                    </TextBox>
                    <TextBox className={styles.groupElement}>
                        Donations to Date
                        <span className={styles.value}>
                            {sumDonatorsToDate.toString()}
                        </span>
                    </TextBox>
                    <TextBox className={styles.groupElement}>
                        Total Hashes{""}
                        <b className={styles.value}>{sumHashes.toString()}</b>
                    </TextBox>
                    <LoginButtons />
                </div>
            </div>
            <SearchBar value={query} onChange={setQuery} />
            <Content>
                <h2 className={styles.heading}>
                    <span className={styles.light}>
                        The Newest &amp; Easiest Way to Donate
                    </span>{" "}
                    <br />
                    Everyone can contribute
                </h2>
                <div className={styles.charities}>
                    {charities
                        .filter((c) =>
                            c.longName
                                .toLowerCase()
                                .includes(query.search.toLowerCase())
                        )
                        .filter(
                            (c) =>
                                query.charityTypes.length === 0 ||
                                query.charityTypes.find(
                                    (ct) => ct.name === c.type?.name
                                )
                        )
                        .map((c, i) => (
                            <CharityBox
                                key={c.id}
                                charity={c}
                                charityTypes={charityTypes}
                            />
                        ))}
                </div>
            </Content>
        </Fragment>
    );
};

export default Home;
