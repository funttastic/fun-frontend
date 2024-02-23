// import { Status } from '@/model/enum/status'
import { pushStack } from '@/model/state/redux/stack/methods'
import { Map } from '@/model/helper/extendable-immutable/map'

pushStack('api.funttastic.client.updateStatus', (currentState, payload) => {
    let nextState = new Map(currentState)

    if (payload) {
        nextState = nextState.setIn(
            'api.funttastic.client.status',
            JSON.parse(
                JSON.stringify({
                    'fun-client': payload['fun-client'],
                    'hb-gateway': payload['hb-gateway'],
                    'hb-client': payload['hb-client'],
                }),
            ),
        )
    }

    nextState = nextState.toJS()

    return nextState
})
