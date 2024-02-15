import { Map } from '@/model/helper/extendable-immutable/map'

const map = new Map()

map.setIn(
    'api.funttastic.client.status',
    JSON.parse(
        JSON.stringify({
            'fun-client': {
                status: 'stopped',
                message: 'Stopped',
            },
            'hb-gateway': {
                status: 'stopped',
                message: 'Stopped',
            },
            'hb-client': {
                status: 'stopped',
                message: 'Stopped',
            },
        }),
    ),
)

const initialState = map.toJS()

export { initialState }
