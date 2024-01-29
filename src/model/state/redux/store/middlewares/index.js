import thunk from 'redux-thunk'

import {mainMiddleware} from './main.middleware'

export const middlewares = {
	mainMiddleware,
	thunkMiddleware: thunk
}
