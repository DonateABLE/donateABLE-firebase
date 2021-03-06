import { ModalController } from "components/modal";
import { SnackBar } from "components/snack-bar";
import { bind } from "decko";
import * as firebaseApp from "firebase/app";
import About from "pages/about";
import Charity from "pages/charity";
import CharityEdit from "pages/charity-edit";
import Home from "pages/home";
import Login from "pages/home/login";
import HowItWorks from "pages/how-it-works";
import PrivacyPolicy from "pages/privacy-policy";
import UserEdit from "pages/user";
import {
    Component,
    createElement,
    createRef,
    ReactNode,
    FunctionComponent,
    Fragment,
} from "react";
import { findDOMNode } from "react-dom";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { classNames, clickedOn } from "utils";
import Menu from "./menu";
import styles from "./style.scss";
import FAQ from "pages/faq";
import { useUser } from "fb";
import Button from "components/button";

interface State {
    menuOpen: boolean;
    authTitle: string;
}

export default class Layout extends Component<{}, State> {
    private menuRef = createRef<HTMLElement>();

    constructor(props: {}) {
        super(props);

        this.state = {
            menuOpen: false,
            authTitle: "Login & Signup",
        };
    }

    public componentDidMount = () => {
        firebaseApp.auth().onAuthStateChanged((user) => {
            user
                ? this.setState({ authTitle: "Sign Out" })
                : this.setState({ authTitle: "Login & Sign Up" });
        });
    };

    public render(): ReactNode {
        return (
            <Router>
                <div
                    className={classNames(styles.layout, {
                        [styles.open]: this.state.menuOpen,
                    })}
                >
                    <Menu
                        open={this.state.menuOpen}
                        onMenuOpenClick={this.onMenuOpenClick}
                        onMenuCloseClick={this.onMenuCloseClick}
                        options={[
                            {
                                href: "/",
                                title: "Home",
                            },
                            {
                                href: "/login",
                                title: this.state.authTitle,
                            },
                            {
                                href: "/about",
                                title: "About",
                            },
                            {
                                href: "/how_it_works",
                                title: "How it Works",
                            },
                            {
                                href: "/privacy",
                                title: "Privacy Policy",
                            },
                            {
                                href: "/faq",
                                title: "FAQ",
                            },
                        ]}
                        rootRef={this.menuRef}
                    />
                    <header className={styles.header}>
                        <Link to="/">
                            <img
                                src={
                                    // eslint-disable-next-line @typescript-eslint/no-var-requires
                                    require("assets/img/logo/donateABLE-long-colour-250.png")
                                        .default
                                }
                                alt="donateABLE logo"
                            />
                        </Link>
                    </header>
                    <div className={styles.content}>
                        <Switch>
                            <Route path="/about" component={About} />
                            <Route path="/user" component={UserEdit} />
                            <Route
                                path="/charity/create"
                                component={CharityEdit}
                            />
                            <Route
                                path="/charity/:id/edit"
                                component={CharityEdit}
                            />
                            <Route path="/charity/:name" component={Charity} />
                            <Route path="/login" component={Login} />
                            <Route
                                path="/how_it_works"
                                component={HowItWorks}
                            />
                            <Route path="/privacy" component={PrivacyPolicy} />
                            <Route path="/faq" component={FAQ} />
                            <Route path="/" component={Home} />
                        </Switch>
                    </div>
                    <a href="https://synergenics.ca">
                        <footer className={styles.footer}>
                            <span className={styles.poweredBy}>Powered By</span>
                            <img
                                className={styles.logo}
                                src={
                                    // eslint-disable-next-line @typescript-eslint/no-var-requires
                                    require("assets/img/logo/Synergenics-Logo-2008-White.png")
                                        .default
                                }
                                alt="Synergenics logo"
                            />
                        </footer>
                    </a>
                </div>
                <Switch>
                    <Route path="/" component={ModalController} />
                </Switch>
                <SnackBar />
            </Router>
        );
    }

    @bind
    private onMenuOpenClick(): void {
        this.setState({ menuOpen: true });
        document.body.addEventListener("click", this.onBodyClick);
    }

    @bind
    private onMenuCloseClick(): void {
        this.setState({ menuOpen: false });
        document.body.removeEventListener("click", this.onBodyClick);
    }

    @bind
    private onBodyClick(e: MouseEvent): void {
        if (clickedOn(e, this.menuRef.current)) {
            return;
        }
        this.setState({ menuOpen: false });
        document.body.removeEventListener("click", this.onBodyClick);
    }
}
