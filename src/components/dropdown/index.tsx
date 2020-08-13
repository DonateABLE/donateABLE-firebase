import Button from "components/button";
import Icon from "components/icon";
import { createElement, FunctionComponent, useEffect, useState } from "react";
import styles from "./style.scss";

const DropDown: FunctionComponent<{ title: string; content: any }> = ({
    title,
    content,
}) => {
    //hooks and functions to update hooks
    const [show, setShow] = useState(false);

    const handleShow = () => {
        show ? setShow(false) : setShow(true);
    };

    const iconPlus = "plus-circle";
    const iconMinus = "minus-circle";
    const [iconSelect, setIcon] = useState<any>(iconPlus);

    const handleIcon = () => {
        show ? setIcon(iconMinus as any) : setIcon(iconPlus as any);
    };

    const [animateState, setAnimateState] = useState<any>(
        styles.transitionStart
    );

    const handleAnimate = () => {
        show
            ? setAnimateState(styles.transitionEnd as any)
            : setAnimateState(styles.transitionStart as any);
    };

    useEffect(() => {
        handleAnimate();
        handleIcon();
    }, [show]);

    const answer = show ? (
        <div className={styles.answersActive}>
            <div className={styles.content}>{content}</div>
        </div>
    ) : null;

    return (
        <div className={styles.questions}>
            <div className={styles.buttonBorder}>
                <Button
                    className={styles.faqButton}
                    fullWidth
                    color="light"
                    size="medium"
                    onClick={handleShow}
                >
                    {
                        <div>
                            <Icon className={styles.icon} name={iconSelect} />
                            <b>{title}</b>
                        </div>
                    }
                </Button>
            </div>

            <div className={animateState}>{answer}</div>
        </div>
    );
};

export default DropDown;
