import {Map} from '@/model/helper/extendable-immutable/map'

if (window.app == null) {
	window.app = new Map().asMutable()

	window.app.setIn('session', window.sessionStorage)
	window.app.setIn('local', window.localStorage)
}

export const app = window.app
