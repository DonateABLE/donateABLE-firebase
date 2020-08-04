import Button from "components/button";
import Icon from "components/icon";
import {
    createElement,
    FunctionComponent,
    useEffect,
    useRef,
    useState,
} from "react";
import styles from "./style.scss";
import { __ } from "lang";

const DropDown: FunctionComponent<{ title: string; content: any }> = ({
    title,
    content,
}) => {
    const [show, setShow] = useState(false);

    const iconPlus: any = "plus-circle";
    const iconMinus: any = "minus-circle";
    const [iconSelect, setIcon] = useState<any>(iconPlus);

    function clickOutside(ref: any): void {
        useEffect(() => {
            const handleClickOutside = (event: any) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    setShow(false);
                } else {
                    show ? setShow(false) : setShow(true);
                }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref, show]);

        useEffect(() => {
            handleIcon();
        }, [show]);
    }

    const wrapperRef = useRef(null);
    clickOutside(wrapperRef);

    const handleIcon = () => {
        show ? setIcon(iconMinus as any) : setIcon(iconPlus as any);
    };

    return (
        <div ref={wrapperRef} className={styles.questions}>
            <Button
                className={styles.faqButton}
                fullWidth
                color="light"
                size="medium"
            >
                {
                    <div>
                        <Icon className={styles.icon} name={iconSelect} />
                        <b>{title}</b>
                    </div>
                }
            </Button>

            {show ? (
                <div className={show ? styles.answersActive : styles.answer}>
                    <div className={styles.content}>{content}</div>
                </div>
            ) : null}
        </div>
    );
};

export default DropDown;
