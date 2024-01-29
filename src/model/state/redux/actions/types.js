import {Map} from 'immutable'
import {app} from '@/model/storage/app'

let actionTypes = app.getIn('redux.actions.types')

if (actionTypes == null) {
	actionTypes = new Map().asMutable()

	app.setIn('redux.actions.types', actionTypes)
}

export {actionTypes}
