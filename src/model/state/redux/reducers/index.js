import {Map} from 'immutable'
import {app} from '@/model/storage/app'

let reducers = app.getIn('redux.reducers')

if (reducers == null) {
	reducers = new Map().asMutable()

	require('./root.reducer')

	app.setIn('redux.reducers', reducers)
}

export {reducers}
