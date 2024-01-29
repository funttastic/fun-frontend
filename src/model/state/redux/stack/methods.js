import {app} from "@model/storage/app"

const actionTypeApiStatuses = app.getIn('redux.actions.api.statuses')
const actionTypeApiSubActions = app.getIn('redux.actions.api.subActions')
const actionTypes = app.getIn('redux.actions.types')
const actionCreators = app.getIn('redux.actions.creators')
const actionBounds = app.getIn('redux.actions.bounds')
const reducers = app.getIn('redux.reducers')
const reduxStore = app.getIn('redux.store')

export function split(input) {
	return input.split('.')
}

export function pushActionTypeApiStatus(status) {
	actionTypeApiStatuses.setIn(status, status)
}

export function pushActionTypeApiSubAction(subAction) {
	actionTypeApiSubActions.setIn(subAction, subAction)
}

export function pushActionType(actionType) {
	actionTypes.setIn(actionType, actionType)
}

export function buildActionCreator(actionType) {
	return (payload) => ({
		type: actionType,
		payload
	})
}

export function pushActionCreator(actionType, actionCreator) {
	actionCreators.setIn(actionTypes.getIn(actionType), actionCreator)
}

export function buildActionBound(actionCreator) {
	return (payload) => {
		reduxStore.dispatch(actionCreator(payload))
	}
}

export function pushActionBound(actionType, actionBound) {
	actionBounds.setIn(actionTypes.getIn(actionType), actionBound)
}

export function buildReducer(actionType, preReducer) {
	return (currentState, {type = actionType, payload}) => {
		return preReducer(currentState, payload)
	}
}

export function pushReducer(actionType, reducer) {
	reducers.setIn(actionTypes.getIn(actionType), reducer)
}

export function pushStack(actionType, preReducer) {
	const actionCreator = buildActionCreator(actionType)
	const actionBound = buildActionBound(actionCreator)
	const reducer = buildReducer(actionType, preReducer)

	pushActionType(actionType)
	pushActionCreator(actionType, actionCreator)
	pushActionBound(actionType, actionBound)
	pushReducer(actionType, reducer)
}
