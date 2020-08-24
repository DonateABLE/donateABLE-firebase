import Icon from "components/icon";
import { useUser } from "fb";
import {
    Component,
    createElement,
    Fragment,
    FunctionComponent,
    ReactNode,
    RefObject,
    useState,
    useEffect,
} from "react";
import { Link } from "react-router-dom";
import { classNames } from "utils";
import noUser from "../../assets/user.svg";
import styles from "./style.scss";
import Button from "components/button";

type Option = {
    title: string;
} & (
    | {
          href: string;
      }
    | {
          onClick: () => void;
      }
);

interface Props {
    open: boolean;
    onMenuOpenClick: () => void;
    onMenuCloseClick: () => void;
    options: Array<{ href: string; title: string }>;
    rootRef: RefObject<HTMLElement>;
}

const Buttons: FunctionComponent<Props> = (props) => {
    const user = useUser();
    const [lightText, setLightText] = useState<string>("");
    const [darkText, setDarkText] = useState<string>("");
    const lightLink = user ? "/user" : "/login";
    const darkLink = "/login";

    useEffect(() => {
        if (user) {
            setLightText("View Account");
            setDarkText("Sign Out");
        } else {
            setLightText("Login");
            setDarkText("Sign Up");
        }
    }, [user]);

    return (
        <div>
            <Link to={lightLink}>
                <Button fullWidth className={styles.lightbutton}>
                    {lightText}
                </Button>
            </Link>
            <Link to={darkLink}>
                <Button fullWidth className={styles.darkbutton}>
                    {darkText}
                </Button>
            </Link>
        </div>
    );
};

const Menu: FunctionComponent<Props> = (props) => {
    const user = useUser();

    return (
        <nav
            className={classNames(styles.menu, {
                [styles.open]: props.open,
            })}
            ref={props.rootRef}
        >
            <button className={styles.btnOpen} onClick={props.onMenuOpenClick}>
                <Icon name="bars" className={styles.burger} />
            </button>
            <button
                className={styles.btnClose}
                onClick={props.onMenuCloseClick}
            >
                <Icon name="times" />
            </button>
            {user === undefined ? (
                <Link to="/" onClick={props.onMenuCloseClick}>
                    <img
                        className={styles.logo}
                        // eslint-disable-next-line @typescript-eslint/no-var-requires
                        src={require("assets/img/logo/d-coloured.png").default}
                        alt="logo"
                    />
                </Link>
            ) : (
                <Link
                    to="/user"
                    onClick={props.onMenuCloseClick}
                    className={styles.userLink}
                >
                    <img
                        className={styles.portrait}
                        src={user.portrait ?? noUser}
                        alt="user portrait"
                    />
                    <h3 className={styles.userName}>{user.fullName}</h3>
                </Link>
            )}
            <ul>
                {props.options.map((option) => (
                    <li key={option.href}>
                        <Link
                            to={option.href}
                            className={styles.link}
                            onClick={props.onMenuCloseClick}
                        >
                            {option.title}
                        </Link>
                    </li>
                ))}
            </ul>
            <Buttons />
        </nav>
    );
};
export default Menu;
