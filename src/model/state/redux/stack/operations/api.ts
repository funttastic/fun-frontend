import { pushStack } from '@/model/state/redux/stack/methods'
import { Map } from '@/model/helper/extendable-immutable/map'

// @ts-ignore
pushStack('api.funttastic.client.updateToken', (currentState, payload) => {
  let nextState = new Map(currentState)

  if (payload) {
    nextState = nextState.setIn(
      'api.funttastic.client.token',
      payload
    )
  }

  // @ts-ignore
  nextState = nextState.toJS()

  return nextState
})

// @ts-ignore
pushStack('app.updateWizard', (currentState, payload) => {
  console.log('start updateWizard', payload);
  let nextState = new Map(currentState)

  if (payload) {
    nextState = nextState.setIn(
      'app.wizard',
      {...nextState.getIn('app.wizard'), ...payload}
    )
  }

  // @ts-ignore
  nextState = nextState.toJS()

  // noinspection TypeScriptUnresolvedReference
  // @ts-ignore
  console.log('api.updateMarkets', nextState.app.wizard);

  return nextState
});


// @ts-ignore
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

    // @ts-ignore
  nextState = nextState.toJS()

    return nextState
})
