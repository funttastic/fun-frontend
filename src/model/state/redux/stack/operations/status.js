import {pushStack} from "@model/state/redux/stack/methods"
import {Status} from "@/model/enum/status";

pushStack('external.api.updateStatus', (currentState, payload) => {
	let nextState = currentState.asImmutable()

	if (Status.list.includes(payload)) {
		nextState = nextState.setIn('external.api.status', payload)
	}

	return nextState
})
