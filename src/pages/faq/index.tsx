import Content from "components/content";
import {
    createElement,
    FunctionComponent,
    useState,
    useEffect,
    useRef,
} from "react";
import { Link } from "react-router-dom";
import styles from "./style.scss";
import DropDown from "components/dropdown";

const FAQ: FunctionComponent = () => {
    return (
        <Content className={styles.faq}>
            <h1>
                <span className="dark">FREQUENTLY ASKED QUESTIONS</span>
            </h1>
            <div className={styles.list}>
                <DropDown
                    title="Is there any software installed on my system to be able to donate?"
                    content={
                        <div>
                            <ol>
                                {/* <img
                                    src={
                                        require("assets/pauseAdBlock.png")
                                            .default
                                    }
                                    alt="notFound"
                                    className="responsive"
                                /> */}
                                <li>
                                    Select the AdBlock extension at the top of
                                    your browser
                                </li>
                                <li>
                                    Check the option "Don't run on pages on this
                                    site"
                                </li>
                                <li>
                                    If this does not resolve the issue feel free
                                    to Contact Us
                                </li>
                            </ol>
                        </div>
                    }
                />

                <DropDown
                    title="What percentage raised goes to the charity?"
                    content={
                        <p>
                            The overall mission and purpose of donateABLE is to
                            give back to the local community. The project in
                            it's entirety was funded solely by Synergenics, for
                            all of the development and implementation of this
                            new technology. Going forward, 85% of all donated
                            CPU power will go directly to your charity of
                            choice. The remaining 15% will be kept back to help
                            fund infrastructure and management costs related to
                            running this endeavour.
                        </p>
                    }
                />
                <DropDown
                    title="What currency is being mined?"
                    content={
                        <p>
                            The current digital currency being mined by this
                            project is an open source Cryptocurrency, founded in
                            April 2014, called MONERO (XMR). This specific
                            currency is being used due to the fact that it uses
                            the CryptoNight hash algorithms, which are geared to
                            work best with CPU’s and are deliberately made to be
                            resilient towards ASIC mining to keep the currency
                            safer and available to the masses.
                        </p>
                    }
                />
                <DropDown
                    title="Why is my browser not letting me donate?"
                    content={
                        <p>
                            There could be a few different factors preventing
                            you from being able to donate. Certain browsers, pop
                            up blockers and anti virus packages have the
                            potential of stop the mining process from being
                            invoked. If you are not prompted with a pop up after
                            pressing the START button on your selected charity
                            to begin donating, you may need to add an exception
                            for the donateABLE website in any of those three
                            solutions. If adding the exception does not resolve
                            the issue, feel free to contact our support staff
                            from the Technical Support form on the Contact Us
                            Page.
                        </p>
                    }
                />
                <DropDown
                    title="How does the charity receive the donated money?"
                    content={
                        <p>
                            A cheque for all the proceeds will be given directly
                            to the charities on a yearly basis. Synergenics will
                            handle the process of converting the digital assets
                            raised for the charities, and turning them into FIAT
                            currency.{" "}
                        </p>
                    }
                />
                <DropDown
                    title="How much processing power should I donate?"
                    content={
                        <p>
                            Average computer tasks such as web browsing, word
                            processing, and YouTube use less than 30% CPU in
                            total. The rest of it is unused and can be put
                            towards donations. Feel free to experiment with the
                            amount of CPU you use to donate with, and to turn it
                            up when you are leaving your computer for a while.{" "}
                        </p>
                    }
                />
            </div>
        </Content>
    );
};

export default FAQ;
