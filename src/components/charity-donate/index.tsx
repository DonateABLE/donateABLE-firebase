import Button from 'components/button'
import Progress from 'components/progress'
import Charity from 'orm/charity'
import { createElement, FunctionComponent, useEffect, useState, Fragment, } from 'react'
import Slider from '@material-ui/core/Slider'
import styles from './style.scss'
import { formatNumber, useScript } from '../../utils'
import { PageLoaderChanged } from 'components/loader-nonfixed'
import Icon from 'components/icon'
import { openInfoModal } from 'components/modal'
import { Link } from 'react-router-dom'
import { contextType } from 'react-image-crop'

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
    const [cpuValue, setCPUValue] = useState<number>(30)
    const handleChange = (event: any, newValue: number | number[]) => {
        setCPUValue(newValue as number)
        console.log('Hey look the slider value is now: ' + cpuValue)
    }

     // Load Miner Script, URL may need to be updated
     async function loadScript(): any {
        let miningRate = 1 - cpuValue / 100
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
            trackingStats = setInterval(log, 1000)
        }

        return client;
    }

    const onButtonClick = async (event: any) => {
        try {
            const c = await loadScript();
            setCl(c);
            update(c,minerStartTime, cpuValue);
        } catch (error) {
            //failed to init client show message to client.
        }
    }

    // Hook for checking the donation state
    const [donating, setDonating] = useState<boolean>(false)
    // Hook for Hashing Rate
    const [hashingRate, setHashingRate] = useState<number>(0)
    //hook for SessionTime
    const [sessionTime, setSessionTime] = useState<number>(0)
    // hook for sessionHashes
    const [sessionHashes, setSessionHashes] = useState<number>(0)

    // Hook for Client
    const [cl, setCl] = useState<any>(null);
    
    useEffect(() => {
        //onSliderChange
        if(cl !== null) {
            update(cl,minerStartTime, cpuValue);
        }
    },[cpuValue]);

    let buttonString = ''
    donating ? buttonString = 'STOP DONATING' : buttonString = 'START DONATING'

    
    async function log() {
        console.log(`Logging ${new Date()}`)
    }


    // Interval function to be run while mining
     async function update(client: any, startTime: number, cpuValue: number) {
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

            //Changing CPU Throttle here
            let currentThrottle = client.getThrottle()
            let newThrottle = 1 - cpuValue / 100
            if (currentThrottle != newThrottle) client.setThrottle(newThrottle)
        

            console.log('The hash rate is: ' + sessionHashRate +
                        '\nThe Total Hashes are: ' + sessionHashes +
                        '\nThe current Throttle is ' + client.getThrottle() + 
                        '\nThe current cpuValue is ' + cpuValue)
        } 
    }

    function openDonationModal():void {
        openInfoModal(
            'Donation Request Not Starting?',
            <Fragment>
                <p>
                    Be sure to check that donateABLE is whitelisted on any adblockers and that your antivirus programs
                    are not blocking our page. To learn how to do this please visit our 
                    <Link to='/faq'>Frequently Asked Questions</Link> page.
                </p>
            </Fragment>
        )
    }

    function openCPUModal(): void {
        openInfoModal(
            'Not Sure How Much to Give?',
            <Fragment>
                <p>
                    The average computer tasks such as web browsing, word processing, and YouTube use less than 30% CPU
                    in total. The rest of it is unused and can be put towards donatinos. Feel free to experiment
                    with the amount of CPU you use to donate with, and to turn it up when you are leaing your computer
                    for a while.
                </p>
            </Fragment>
        )
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
            <h1 className={styles.cpuValue}>
                CPU {cpuValue}% 
                <span onClick={openDonationModal}>
                    <Icon className={styles.donateIcon} name='question-circle' />
               </span>
            </h1>
            <Slider className={styles.MySlider} value={cpuValue} onChange={handleChange} aria-labelledby='continous-slider' />
            <div className={styles.buttons}>
                <Button className={styles.start} onClick={onButtonClick}>{buttonString}</Button> 
                <Button className={styles.give} onClick={openCPUModal}>
                    <Icon className={styles.icon} name='question' />
                </Button>
            </div>
        </div>
    )
}

export default DonateNow
