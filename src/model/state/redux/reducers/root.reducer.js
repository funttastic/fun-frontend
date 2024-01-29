import {app} from "@model/storage/app"
import {reducers} from "./index"

let rootReducer = reducers.getIn('root')

if (rootReducer == null) {
	const actionTypes = app.getIn('redux.actions.types')

	rootReducer = (currentState, {type, payload}) => {
		const reducer = reducers.getIn(actionTypes.getIn(type))

		if (reducer == null) {
			return currentState
		}

		return reducer(currentState, {type, payload})
	}

	reducers.setIn('root', rootReducer)
}

export {rootReducer}
