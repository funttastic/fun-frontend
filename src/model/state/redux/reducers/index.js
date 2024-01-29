import {Map} from '@/model/helper/extendable-immutable/map'
import {app} from '@/model/storage/app'

let reducers = app.getIn('redux.reducers')

if (reducers == null) {
	reducers = new Map().asMutable()

	await import('./root.reducer')

	app.setIn('redux.reducers', reducers)
}

export {reducers}
