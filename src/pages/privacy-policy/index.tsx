import { createElement, Fragment, FunctionComponent } from 'react'
import styles from './styles.scss'


const PrivacyPolicy: FunctionComponent = () => {
    return <Fragment>
        <div className={styles.PrivacyPolicy}>
            <h1 className={styles.heading}>
                Privacy Policy
            </h1>
        </div>
    </Fragment>
}

export default PrivacyPolicy