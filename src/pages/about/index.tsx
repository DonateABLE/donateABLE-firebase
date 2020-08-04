import Button from "components/button";
import Content from "components/content";
import DonateABox from "components/donateabox";
import { createElement, FunctionComponent } from "react";
import { Link } from "react-router-dom";
import styles from "./style.scss";

const About: FunctionComponent = () => {
    return (
        <Content className={styles.about}>
            <h2>
                <span className="light">About donateABLE</span>
            </h2>
            <div className={styles.items}>
                <section>
                    <DonateABox char="WHO" fontSize="40" />
                    <h3>is donateABLE?</h3>
                    <p>
                        donateABLE is a website designed, developed, and managed
                        by Synergenics, a professional IT support and solutions
                        provider to Guelph and Southwestern Ontario for over 30
                        years. Their 30 years of service has allowed them to
                        build relationships with many companies in a variety of
                        different industries, but some of their most cherished
                        relationships are with local Guelph charities and
                        organizations.
                    </p>
                </section>

                <section>
                    <DonateABox char="WHAT" fontSize="35" />
                    <h3>is donateABLE?</h3>
                    <p>
                        donateABLE is a website project developed and managed by
                        Synergenics. This solution will take small amounts of
                        computational power donated from individuals and pool it
                        together into a larger resource to generate real
                        monetary value for your charity. This website is going
                        to allow anyone with a computer to make a difference no
                        matter what their financial situation is, by donating
                        unused computer time.
                    </p>
                </section>

                <section>
                    <DonateABox char="WHY" fontSize="40" />
                    <h3>is donateABLE?</h3>
                    <p>
                        Synergenics has consistently made an effort, for the
                        past 30 years, to give back to their local community in
                        any way they can. They have done this by providing
                        discounted IT support, sponsoring local youth
                        organizations, and donating and sponsoring local golf
                        tournaments. Now they are combining their passion and
                        knowledge in the IT world with their passion of giving
                        back to create a solution that makes a difference.
                    </p>
                </section>
            </div>
            <Link to="/how_it_works">
                <Button size="large">See How It Works</Button>
            </Link>
        </Content>
    );
};

export default About;
