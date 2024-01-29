import {List as ExtendableList} from "extendable-immutable"

/**
 *
 */
export class List extends ExtendableList {

	/**
	 *
	 * @returns {*}
	 */
	constructor(...args) {
		super(...args)

		return this.asMutable()
	}
}
