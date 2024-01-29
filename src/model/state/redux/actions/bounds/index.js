import {Map} from "immutable"
import {app} from "@model/storage/app"

let actionBounds = app.getIn('redux.actions.bounds')

if (actionBounds == null) {
	actionBounds = new Map().asMutable()

	app.setIn('redux.actions.bounds', actionBounds)
}

export {actionBounds}
