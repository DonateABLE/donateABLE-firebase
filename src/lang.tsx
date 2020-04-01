import langFiles, { LangKeys } from 'lang/index.json'
import { createElement, Fragment, FunctionComponent } from 'react'

let language = 'en'

export function __(key: LangKeys): string {
    let current = langFiles[language]

    for (const part of key.split('.')) {
        if (typeof current !== 'object' || current === null) {
            return key
        }
        current = current[part]
    }
    if (typeof current !== 'string') {
        return key
    }
    return current
}

export function setLanguage(lang: string): void {
    language = lang
}

export const La: FunctionComponent<{ ng: LangKeys }> = props => {
    return <Fragment>{__(props.ng)}</Fragment>
}
