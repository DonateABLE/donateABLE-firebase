import Charity from 'orm/charity'
import { createElement, FunctionComponent, useState } from 'react'
import styles from './style.scss'
import Slider from "@material-ui/core/Slider";

interface Props {
    charity: Charity
}

const DonateNow = () => {
    const [value, setValue] = useState<number>(30)
    const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number);
    }

    return(     
        <div className={styles.donate}>
            <h3>Donate Now</h3>
            <div>
                <p> This is some filler content</p>
                <Slider value={value} onChange={handleChange} aria-labelledby='continous-slider' />
            </div>
        </div>
    )
}

export default DonateNow
