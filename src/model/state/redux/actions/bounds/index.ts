import {Map} from '@/model/helper/extendable-immutable/map'
import {app} from '@/model/storage/app'

let actionBounds = app.getIn('redux.actions.bounds')

if (actionBounds == null) {
	actionBounds = new Map().asMutable()

	app.setIn('redux.actions.bounds', actionBounds)
}

export {actionBounds}
