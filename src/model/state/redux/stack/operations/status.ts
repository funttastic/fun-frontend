import { pushStack } from '@/model/state/redux/stack/methods'
import { Status } from '@/model/enum/status'
import { Map } from '@/model/helper/extendable-immutable/map'

pushStack('api.funttastic.client.updateStatus', (currentState, payload) => {
    let nextState = new Map(currentState)

    if (payload) {
        nextState = nextState.setIn(
            'api.funttastic.client.status',
            JSON.parse(
                JSON.stringify({
                    'fun-client': {
                        status: payload['fun-client']['status'],
                        message: payload['fun-client']['message'],
                    },
                    'hb-gateway': {
                        status: payload['hb-gateway']['status'],
                        message: payload['hb-gateway']['messsage'],
                    },
                    'hb-client': {
                        status: payload['hb-client']['status'],
                        message: payload['hb-client']['message'],
                    },
                }),
            ),
        )
    }

    nextState = nextState.toJS()

    return nextState
})
