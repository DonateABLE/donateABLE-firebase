import { createElement, FunctionComponent } from 'react'
import { classNames } from 'utils'
import styles from './style.scss'

const DonateABox: FunctionComponent<{ char: string, className?: string }> = ({ char, className }) => {
    const len = 64
    const serif = 7
    return <svg
        width='160px'
        height='160px'
        viewBox='0 0 160 160'
        className={classNames(styles.donateABox, className)}
    >
        <defs>
            <g
                className={styles.border}
                id='corner'
                fill='none'
                strokeWidth='4'
                transform='translate(6, 6)'
            >
                <polyline points={`${len},0 ${len},${len} 0,${len}`} />
                <line x1={len - serif} y1='0' x2={len + serif} y2='0' />
                <line y1={len - serif} x1='0' y2={len + serif} x2='0' />
            </g>
        </defs>
        <g transform='translate(80, 80)'>
            <use href='#corner' transform='rotate(0)' />
            <use href='#corner' transform='rotate(90)' />
            <use href='#corner' transform='rotate(180)' />
            <use href='#corner' transform='rotate(270)' />
        </g>
        <text
            className={styles.char}
            x='50%'
            y='50%'
            dominantBaseline='central'
            textAnchor='middle'
            fontSize='110'
            fontFamily='Montserrat'
            fontWeight='800'
        >
            {char}
        </text>
    </svg>
}

export default DonateABox
