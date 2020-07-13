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
    useScript('https://www.hostingcloud.racing/X9g0.js')
    // Hook and Handler for tracking Slider value
    const [value, setValue] = useState<number>(30)
    const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number)
    }
    var minerStartTime = 0

    // Hook for checking the donation state
    const [donating, setDonating] = useState<boolean>(false)

    // Load Miner Script, URL may need to be updated
    async function loadScript()  {
        let miningRate = 1 - value / 100
        const client = await new Client.Anonymous(props.charity.siteKey, {
            throttle: miningRate, // CPU usage of the mine
            c: 'w', // Coin
            ads: 0, // Ad Option
            autoThreads: true, // Adjust multithreading based on availability
        })

        client.on("open", async function() {
            const date = new Date()
            minerStartTime = date.getTime()

            // Code to post to firebase backend
            setInterval(start, 10000, client, minerStartTime)
        })

        if (donating) {
            setDonating(false as boolean)
            await client.stop()
            // Code to push mining stats to firestore backend
            console.log("The mining has stopped")
        } else {
            setDonating(true as boolean)
            await client.start()
            console.log("The mining has started")
            const date = new Date()
            minerStartTime = date.getTime() // time in ms since Jan 1 1970
        }
    }

     async function start(client:any, date: number) {
        console.log("Starting stat tracking")
        var sessionHashRate = 0 
        var sessionHashes = 0
        console.log(client.isRunning())
        if(client.isRunning()) {
            sessionHashRate = Math.round(await client.getHashesPerSecond())
            sessionHashes = await client.getTotalHashes()

            console.log("The hash rate is: " + sessionHashRate + "\nThe total Hashes are: " + sessionHashes) 
        } 
    }

    let buttonString = ''
    let hashingRate = 0

    donating ? buttonString = 'STOP DONATING' : buttonString = 'START DONATING'

    const donate = () => {
        useScript('https://www.hostingcloud.racing/X9g0.js')
        let miningRate = 1 - value / 100
        let client = new Client.Anonymous(props.charity.siteKey, {
            throttle: miningRate, // CPU usage of the mine
            c: 'w', // Coin
            ads: 0, // Ad Option
            autoThreads: true, // Adjust multithreading based on availability
        })
        // Cant find Client error is fine, it is from the imported script
        // BUG might be here if reinit client on miner shutdown
        console.log("The value from the slider is: " + value )
        const date = new Date()

        if (donating) {
            const minerStartTime = date.getTime()
            client.stop()
            setDonating(false as boolean)
        } else {

            client.start()
            setDonating(true as boolean)
        }

        donating ? client.stop() : client.start()
        donating ? setDonating(false as boolean) : setDonating(true as boolean)
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
                <Button className={styles.start} onClick={loadScript}>{buttonString}</Button>
            </div>
        </div>
    )
}

export default DonateNow
