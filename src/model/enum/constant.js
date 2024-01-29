import {BaseEnum} from './base-enum'

/**
 *
 */
export class Constant extends BaseEnum {

	static example = new Constant('Example', 'Example description.', 'exampleValue')

	/**
	 *
	 * @param title
	 * @param description
	 * @param value
	 */
	constructor(title, description, value) {
		super()

		this.title = title
		this.description = description
		this.value = value
	}
}
