import langFiles, { LangKeys } from 'lang/index.json'
import { createElement, Fragment, FunctionComponent } from 'react'

let language = 'en'

export function __(key: LangKeys, options: { [key: string]: string } = {}): string {
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

    for (const [param, value] of Object.entries(options)) {
        current = current.replace(new RegExp(':' + param, 'g'), value)
    }

    return current
}

export function setLanguage(lang: string): void {
    language = lang
}

export const La: FunctionComponent<{ ng: LangKeys }> = props => {
    return <Fragment>{__(props.ng)}</Fragment>
}
