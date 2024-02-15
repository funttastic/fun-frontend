import {Map as MutableMap} from 'extendable-immutable'

/**
 *
 */
export class Map extends MutableMap {

	/**
	 *
	 * @returns {*}
	 */
	constructor(...args) {
		super(...args)

		return this.asMutable()
	}


	/**
	 *
	 * @param key
	 * @returns {null}
	 */
	getIn(key) {
		if (key == null) {
			return null
		}

		if (key.constructor === Array) {
			return super.getIn(key)
		}

		return super.getIn(key.split('.'))
	}

	/**
	 *
	 * @param key
	 * @param value
	 */
	setIn(key, value) {
		if (key == null) {
			throw Error(`Invalid key ("${key}").`)
		}

		if (key.constructor === Array) {
			return super.setIn(key, value)
		}

		return super.setIn(key.split('.'), value)
	}
}