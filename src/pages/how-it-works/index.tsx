import Button from 'components/button'
import Content from 'components/content'
import DonateABox from 'components/donateabox'
import { createElement, FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import styles from './style.scss'

const HowItWorks: FunctionComponent = () => {
    return <Content className={styles.howItWorks}>
        <h2>
            <span className='light'>Use Your Computer Power to Generate</span> <br />
            Money For Your Chosen Charity
        </h2>
        <div className={styles.steps}>
            <section>
                <DonateABox char='1' fontSize='110'/>
                <h3>Select Your Charity</h3>
                <p>
                    The first step is the easiest, or the hardest depending on how you
                    look at it, which is selecting the charity you would like to donate
                    to. Simply select a charity out of our provided list that you wish
                    to donate to and begin lending your computer's processor to solve
                    complex algorithms. It's easy and anyone with a computer is able to
                    donate.
            </p>
            </section>

            <section>
                <DonateABox char='2' fontSize='110'/>
                <h3>Set Your Power</h3>
                <p>
                    The second step is setting the amount of processing power you would
                    like to donate. Basically, the more processor power you donate, the
                    more algorithms get solved, which is then translated into digital
                    currency that is then converted into real money to help your charity
                    continue to do good in their community.
            </p>
            </section>

            <section>
                <DonateABox char='3' fontSize='110'/>
                <h3>Start Donating</h3>
                <p>
                    The third step is the easiest. Now that you have selected your
                    charity and set your processing power you are now ready to start
                    donating. Select the start button and carry on with your day. You
                    can browse websites, go walk the dog, or take a trip. No matter what
                    you do just leave donateABLE on and running and we do the rest.
            </p>
            </section>
        </div>
        <Link to='/'>
            <Button size='large' className={styles.startDonating}>Start Donating</Button>
        </Link>
    </Content>
}

export default HowItWorks
