import Charity from 'orm/charity'
import { createElement, FunctionComponent } from 'react'
import styles from './style.scss'

interface Props {
    value: number
    max: number

    className?: string
}

const offset = 1
const Progress: FunctionComponent<Props> = props => {
    const radius = 40
    const outerWidth = 10
    const innerWidth = 7
    const circumference = 2 * Math.PI * (radius - outerWidth / 2)
    const percent = props.value / props.max
    return <svg className={props.className} height={radius * 2} width={radius * 2}>
        <circle
            className={styles.innerCircle}
            cx={radius}
            cy={radius}
            strokeWidth={innerWidth}
            r={radius - (outerWidth / 2)}
        />
        <circle
            className={styles.outerCircle}
            cx={radius}
            cy={radius}
            strokeWidth={outerWidth}
            r={radius - (outerWidth / 2)}
            strokeDasharray={percent !== 1
                ? `${percent * circumference}, ${circumference}`
                : undefined}
            strokeDashoffset={offset}
        />
        <text
            className={styles.value}
            x='50%'
            y='50%'
            dominantBaseline='middle'
            textAnchor='middle'
        >
            {humanNumber(props.value)}
        </text>
    </svg>
}

export default Progress

function humanNumber(num: number): string {
    if (num === 0) {
        return '0'
    }
    if (num < 0) {
        return '-' + humanNumber(Math.abs(num))
    }
    const suffix = ['', 'K', 'M', 'B']
    const digits = Math.floor((Math.log10(num) + 1) / 3)
    return Math.round(num / 1000 ** digits) + suffix[digits]
}
