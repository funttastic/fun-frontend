import {pushStack} from '@/model/state/redux/stack/methods'
import {Status} from '@/model/enum/status';

pushStack('api.funttastic.client.updateStatus', (currentState, payload) => {
	let nextState = currentState.asImmutable()

	const status = Status.getById(payload)

	if (Status.list.includes(status)) {
		nextState = nextState.setIn('api.funttastic.client.status', status)
	}

	return nextState
})
