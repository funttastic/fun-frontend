import { Map } from '@/model/helper/extendable-immutable/map'

const map = new Map()

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
