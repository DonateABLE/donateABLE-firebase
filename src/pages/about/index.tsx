import Button from 'components/button'
import Content from 'components/content'
import Layout from 'components/layout'
import { Component, createElement, ReactNode } from 'react'
import styles from './style.scss'

export default class About extends Component {
    public render(): ReactNode {
        return <Content>
            <h2>About</h2>
        </Content>
    }
}
