import {app} from '@/model/storage/app'
import {reducers} from './index'
import { initialState } from '@/model/state/redux/store/initial-state'

let rootReducer = reducers.getIn('root')

if (rootReducer == null) {
	const actionTypes = app.getIn('redux.actions.types')

	rootReducer = (currentState, {type, payload}) => {
		const reducer = reducers.getIn(actionTypes.getIn(type))

		if (!reducer) {
			return initialState
		}

		return reducer(currentState, {type, payload})
	}

	reducers.setIn('root', rootReducer)
}

export {rootReducer}
