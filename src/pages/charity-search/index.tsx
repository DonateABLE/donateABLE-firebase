import { createElement, FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'

const CharitySearch: FunctionComponent = () => {
    const { query } = useParams()

    return <div>Search {query}</div>
}

export default CharitySearch
