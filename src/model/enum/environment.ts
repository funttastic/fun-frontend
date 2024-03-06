import {BaseEnum} from './base-enum'

import {List} from '@/model/helper/extendable-immutable/list'

/**
 *
 */
export class Environment extends BaseEnum {
    static development = new Environment('development', 'Development', 'Development.')
    static staging = new Environment('staging', 'Staging', 'Staging.')
    static production = new Environment('production', 'Production', 'Production.')

    static list = new List([
        Environment.development,
        Environment.staging,
        Environment.production,
    ])

    /**
     *
     * @param id
     */
    constructor(id, title, description) {
        super()

        this.id = id
        this.title = title
        this.description = description
    }

    /**
     *
     * @param id
     * @returns {*}
     */
    static getById(id) {
        if (!id) {
            throw Error(`Invalid environment ${id}.`)
        }

        return Environment.list.find((item) => item.id === id)
    }
}
