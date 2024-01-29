/**
 *
 */
import {app} from '@/model/storage/app'

if (app.getIn('redux.store') == null) {
	const storeFactory = require('./store.factory').storeFactory
	const initialState = require('./initial-state').initialState
	const subscribers = require('./subscribers').subscribers

	const store = storeFactory(initialState)

	for (let value of Object.values(subscribers)) {
		store.subscribe(value(store))
	}

	app.setIn('redux.store', store)
}

export function dispatch (actionType, payload) {
	const bounds = app.getIn('redux.actions.bounds')
	const bound = bounds.getIn(actionType)

	return bound(payload)
}

export const reduxStore = app.getIn('redux.store')
