import Button from 'components/button'
import Progress from 'components/progress'
import Charity from 'orm/charity'
import { createElement, FunctionComponent, useEffect, useState } from 'react'
import Slider from '@material-ui/core/Slider'
import styles from './style.scss'
import { formatNumber, useScript } from '../../utils'

interface SectionProps {
    title: string
    value: number
    max: number
}

const Section: FunctionComponent<SectionProps> = props => (
    <div className={styles.section}>
        <Progress className={styles.loader} value={props.value} max={props.max} />
        <div className={styles.content}>
            <div className={styles.title}>{props.title}</div>
            <div className={styles.value}>{formatNumber(props.value)}</div>
        </div>
    </div>
)

interface Props {
    charity: Charity
}

const DonateNow: FunctionComponent<Props> = (props) => {
    // Load Miner Script, URL may need to be updated
    useScript('https://www.hostingcloud.racing/X9g0.js')
    let buttonString = ''
    let hashes = 0

    // Hook and Handler for tracking Slider value
    const [value, setValue] = useState<number>(30)
    const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number)
    }

    // Hook for checking the donation state
    const [donating, setDonating] = useState<boolean>(false)

    donating ? buttonString = 'STOP DONATING' : buttonString = 'START DONATING'

    const startDonating = () => {
        // Cant find Client error is fine, it is from the imported script
        let client = new Client.Anonymous('0e7708e6df0272ab5396419b204ee44142ee2263b9e2ed13b3abbea8d39b14f4', {
            throttle: value, c: 'w', ads: 0, autoThreads: true,
        })

        donating ? client.stop() : client.start()
        donating ? setDonating(false as boolean) : setDonating(true as boolean)
        client.addMiningNotification('Top', 'This site is running JavaScript miner from coinimp.com', '#cccccc', 40, '#3d3d3d')
    }

    return(
        <div className={styles.donate}>
            <h3>Charity Name Donate Now</h3>
            <div className={styles.stats}>
                <Section value={hashes} max={5} title='Hashing Rate' />
                <Section value={props.charity.totalTime} max={60} title='Total Time' />
                <Section value={props.charity.totalHashes} max={1000} title='Total Hashes' />

            </div>
            <h1 className={styles.sliderValue}>CPU {value}%</h1>
            <Slider className={styles.MySlider} value={value} onChange={handleChange} aria-labelledby='continous-slider' />
            <div className={styles.buttons}>
                <Button className={styles.start} onClick={startDonating}>{buttonString}</Button>
            </div>
        </div>
    )
}

export default DonateNow
