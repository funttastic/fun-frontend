import {pushStack} from '@/model/state/redux/stack/methods'
import {Status} from '@/model/enum/status';

pushStack('api.funttastic.client.updateStatus', (currentState, payload) => {
	let nextState = currentState.asImmutable()

	if (Status.list.includes(payload)) {
		nextState = nextState.setIn('api.funttastic.client.status', payload)
	}

	return nextState
})
