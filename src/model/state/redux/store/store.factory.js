import {createStore, applyMiddleware} from "redux"

import {middlewares} from "./middlewares"
import {rootReducer} from "./../reducers/root.reducer"
import {initialState} from "./initial-state"

export const storeFactory = (state = initialState) => {
	return applyMiddleware(
		middlewares.mainMiddleware,
		middlewares.thunkMiddleware
	)(createStore)(
		rootReducer,
		state,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
}
