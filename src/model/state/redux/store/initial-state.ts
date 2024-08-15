import { Map } from '@/model/helper/extendable-immutable/map'

let map = new Map()

map = map.setIn(
  'app.wizard',
  {},
)

map.setIn(
    'api.funttastic.client.status',
    JSON.parse(
        JSON.stringify({
            'fun-client': 'unknown',
            'hb-gateway': 'unknown',
            'hb-client': 'unknown',
        }),
    ),
)

const initialState = map.toJS()

export { initialState }
