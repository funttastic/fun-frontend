/**
 *
 */
import {app} from '@/model/storage/app'

if (app.getIn('redux.store') == null) {
	const { storeFactory } = await import('./store.factory')
	const { initialState } = await import('./initial-state')
	const { subscribers } = await import('./subscribers')

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
