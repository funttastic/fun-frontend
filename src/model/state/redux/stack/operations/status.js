import {pushStack} from '@/model/state/redux/stack/methods'
import {Status} from '@/model/enum/status'
import { Map } from '@/model/helper/extendable-immutable/map'

pushStack('api.funttastic.client.updateStatus', (currentState, payload) => {
	let nextState = new Map(currentState)

	const status = Status.getById(payload)

	if (Status.list.includes(status)) {
		nextState = nextState.setIn('api.funttastic.client.status', JSON.parse(JSON.stringify(status)))
	}

	nextState = nextState.toJS()

	return nextState
})
