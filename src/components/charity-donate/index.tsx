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

var trackingStats: any = undefined
var minerStartTime: number = 0

const DonateNow: FunctionComponent<Props> = (props) => {
    useScript('https://www.hostingcloud.racing/X9g0.js')

    // Hook and Handler for tracking Slider value
    const [value, setValue] = useState<number>(30)
    const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number)
    }

    // Hook for checking the donation state
    const [donating, setDonating] = useState<boolean>(false)
    // Hook for Hashing Rate
    const [hashingRate, setHashingRate] = useState<number>(0)
    //hook for SessionTime
    const [sessionTime, setSessionTime] = useState<number>(0)
    // hook for sessionHashes
    const [sessionHashes, setSessionHashes] = useState<number>(0)

    let buttonString = ''
    donating ? buttonString = 'STOP DONATING' : buttonString = 'START DONATING'


    // Load Miner Script, URL may need to be updated
    async function loadScript()  {
        let miningRate = 1 - value / 100
        var client = await Client.Anonymous(props.charity.siteKey, {
            throttle: miningRate, // CPU usage of the mine
            c: 'w', // Coin
            ads: 0, // Ad Option
            autoThreads: true, // Adjust multithreading based on availability
        })

        if (donating) {
            await client.stop()
            setDonating(false as boolean)
            clearInterval(trackingStats)
            trackingStats = null
            // Code to push mining stats to firestore backend
        } else {
            setDonating(true as boolean)
            await client.start(Client.FORCE_MULTI_TAB)
            console.log('The mining has started')
            
            const date = new Date()
            minerStartTime = date.getTime()
            trackingStats = setInterval(start, 1000, client, minerStartTime)
        }
    }

    // Interval function to be run while mining
     async function start(client: any, startTime: number) {
        var sessionHashRate = 0 

        console.log('Is the client running: ' + client.isRunning())


        if (client.isRunning()) {
            sessionHashRate = Math.round(await client.getHashesPerSecond())
            setHashingRate(sessionHashRate as number)
            let currentTotalHashes = await client.getTotalHashes()
            setSessionHashes(currentTotalHashes as number)
            let currentTime = new Date().getTime()
            currentTime = Math.round((currentTime - startTime) / 1000)
            setSessionTime(currentTime as number)

            console.log('The hash rate is: ' + sessionHashRate +
                        '\nThe Total Hashes are: ' + sessionHashes +
                        '\nThe current Throttle is ' + client.getThrottle())
        } 
    }

    const Loader: FunctionComponent = () => {
       return donating ? <PageLoaderChanged /> : null
    }

    return(
        <div className={styles.donate}>
            <h3>Donate Now</h3>
            <div className={styles.stats}>
                <Section value={hashingRate} max={120} title='Hashing Rate' />
                <Section value={sessionTime} max={500} title='Total Time' />
                <Section value={sessionHashes} max={15000} title='Total Hashes' />
            </div>
            <div className={styles.loader}>
                <Loader />
            </div>
            <h1 className={styles.sliderValue}>CPU {value}%</h1>
            <Slider className={styles.MySlider} value={value} onChange={handleChange} aria-labelledby='continous-slider' />
            <div className={styles.buttons}>
                <Button className={styles.start} onClick={loadScript}>{buttonString}</Button>
            </div>
        </div>
    )
}

export default DonateNow
