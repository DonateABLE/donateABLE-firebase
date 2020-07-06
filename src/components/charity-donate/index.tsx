import Button from 'components/button'
import Progress from 'components/progress'
import Charity from 'orm/charity'
import { createElement, FunctionComponent, useEffect, useState } from 'react'
import Slider from '@material-ui/core/Slider'
import styles from './style.scss'
import { formatNumber, useScript } from '../../utils'
import { PageLoaderChanged } from 'components/loader-nonfixed'

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

    // Hook and Handler for tracking Slider value
    const [value, setValue] = useState<number>(30)
    const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number)
    }
    
    // Hook for checking the donation state
    const [donating, setDonating] = useState<boolean>(false)

    // Load Miner Script, URL may need to be updated
    async function loadScript()  {
        useScript('https://www.hostingcloud.racing/X9g0.js')
        let miningRate = 1 - value / 100
        let client = await new Client.Anonymous(props.charity.siteKey, {
            throttle: miningRate, c: 'w', ads: 0, autoThreads: true,
        })
    }

    let buttonString = ''
    let hashingRate = 0
    let totalHashes = 0

    donating ? buttonString = 'STOP DONATING' : buttonString = 'START DONATING'

    const donate = () => {
        // Cant find Client error is fine, it is from the imported script
        // BUG might be here if reinit client on miner shutdown
        console.log("The value from the slider is: " + value )
        const date = new Date()

        // if (donating) {
        //     const minerStartTime = date.getTime()
        //     client.stop()
        //     setDonating(false as boolean)
        // } else {

        //     client.start()
        //     setDonating(true as boolean)
        // }

        // donating ? client.stop() : client.start()
        // donating ? setDonating(false as boolean) : setDonating(true as boolean)
    }

    const Loader: FunctionComponent = props => {
       return donating ? <PageLoaderChanged /> : null
    }

    return(
        <div className={styles.donate}>
            <h3>Charity Name Donate Now</h3>
            <div className={styles.stats}>
                <Section value={hashingRate} max={5} title='Hashing Rate' />
                <Section value={props.charity.totalTime} max={60} title='Total Time' />
                <Section value={props.charity.totalHashes} max={1000} title='Total Hashes' />
            </div>
            <div className={styles.loader}>
                <Loader />
            </div>
            <h1 className={styles.sliderValue}>CPU {value}%</h1>
            <Slider className={styles.MySlider} value={value} onChange={handleChange} aria-labelledby='continous-slider' />
            <div className={styles.buttons}>
                <Button className={styles.start} onClick={donate}>{buttonString}</Button>
            </div>
        </div>
    )
}

export default DonateNow
