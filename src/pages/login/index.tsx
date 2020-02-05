import Button from 'components/button'
import Content, { FullWidth } from 'components/content'
import { openInfoModal } from 'components/modal'
import TextBox from 'components/textbox'
import { charities } from 'data'
import { bind } from 'decko'
import { Component, createElement, Fragment, ReactNode } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import styles from './style.scss'

export default class Login extends Component {
    /**
     * render
     */
    public render(): ReactNode {
        return <Fragment>
            <div className={styles.top}>
                <h2 className={styles.heading}>
                    <span className={styles.light}>
                        Track your stats with your own account
                    </span> <br />
                    and keep track of your donations
                </h2>
                <div className={styles.buttonGroup}>
                    <TextBox className={styles.groupElement}>
                        Currently Donating <b className={styles.value}>14</b>
                    </TextBox>
                    <TextBox className={styles.groupElement}>
                        Donations to Date<b className={styles.value}>345</b>
                    </TextBox>
                    <TextBox className={styles.groupElement}>
                        Total Hashes <b className={styles.value}>{(13256475).toLocaleString()}</b>
                    </TextBox>
                </div>
            </div>
        </Fragment>
    }
}

// export default class Login extends Component {
//     public render(): ReactNode {
//         return <Content>
//             <h2>LOGIN PAGE</h2>
//         </Content>
//     }
// }
