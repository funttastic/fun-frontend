import {Map} from 'immutable'
import {app} from '@/model/storage/app'

let actionCreators = app.getIn('redux.actions.creators')

if (actionCreators == null) {
	actionCreators = new Map().asMutable()

	app.setIn('redux.actions.creators', actionCreators)
}

export {actionCreators}
