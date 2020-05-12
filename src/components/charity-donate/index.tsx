import Charity from 'orm/charity'
import { createElement, FunctionComponent, useEffect, useState } from 'react'
import styles from './style.scss'
import Slider from '@material-ui/core/Slider'
import useScript from '../../utils'
import Button from 'components/button'

interface Props {
    charity: Charity
}

const DonateNow = () => {
    // Load Miner Script
    useScript('https://www.hostingcloud.racing/X9g0.js')
    let buttonString = ''

    // Hook and Handler for tracking Slider value
    const [value, setValue] = useState<number>(30)
    const [donating, setDonating] = useState<boolean>(false)
    const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number)
    }

    donating ? buttonString = 'Stop Donating' : buttonString = 'Start Donating'

    const startDonating = () => {
        let client = new Client.Anonymous('0e7708e6df0272ab5396419b204ee44142ee2263b9e2ed13b3abbea8d39b14f4', {
            throttle: value, c: 'w', ads: 0, autoThreads: true
        });

        donating ? client.stop() : client.start()
        donating ? setDonating(false as boolean) : setDonating(true as boolean)
        console.log(donating)
        client.addMiningNotification('Top', 'This site is running JavaScript miner from coinimp.com', '#cccccc', 40, '#3d3d3d')
    }


    
    return(
        <div className={styles.donate}>
            <h3>Donate Now</h3>
            <div>
                <p> This is some filler content</p>
                <Slider value={value} onChange={handleChange} aria-labelledby='continous-slider' />
                <Button onClick={startDonating}>{buttonString}</Button>
            </div>
        </div>
    )
}

export default DonateNow
