import { Charity } from 'data'
import { createElement, FunctionComponent } from 'react'

interface Props {
    charity: Charity
}

const Statistics: FunctionComponent<Props> = props => (
    <div>
        <h3>{props.charity.name} Statistics</h3>
    </div>
)

export default Statistics
