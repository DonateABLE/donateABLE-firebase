var glob = require("glob");
var path = require("path");
var fs = require('fs').promises;

module.exports = function (source) {
    const callback = this.async()
    this.cacheable && this.cacheable(true);

    (async () => {

        const resourcePath = this.resourcePath

        const config = JSON.parse(source)
        const rootPath = path.join(resourcePath, '..', config.path)
        const files = glob.sync(path.join(rootPath, '/**/*.json'))
            .filter(file => file !== resourcePath)
            .map(file => file.replace(path.join(resourcePath, '../'), ''))

        const lang = {}

        for (const file of files) {
            const parts = file.replace(/\.json$/, '').split('/')

            const absPath = path.join(rootPath, file)
            this.addDependency(absPath)
            const data = JSON.parse((await fs.readFile(absPath)).toString())
            assign(lang, parts, data)
        }

        const keys = getKeys(lang.en)

        await fs.writeFile(path.join(rootPath, 'lang.d.ts'), `// DO NOT EDIT! this is an auto generated file
declare module "lang/index.json" {
    export interface Lang {
        [key: string]: string | number | boolean | null | Lang
    }

    export type LangKeys = ${keys.map(k => JSON.stringify(k)).join(' | ')}
    const langs: Lang
    export default langs;
}`)

        return JSON.stringify(lang)
    })().then((result) => callback(null, result), err => callback(err))
}

function assign(obj, prop, value) {
    if (typeof prop === "string") {
        prop = prop.split(".");
    }

    if (prop.length > 1) {
        var e = prop.shift();
        assign(obj[e] =
            typeof obj[e] === 'object'
                ? obj[e]
                : {},
            prop,
            value);
    } else {
        obj[prop[0]] = value;
    }
}


function getKeys(obj, base = '') {
    let keys = []

    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'object') {
            keys = keys.concat(getKeys(value, base + key + '.'))
        } else {
            keys.push(base + key)
        }
    }
    return keys
}