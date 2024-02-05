import { Map } from '@/model/helper/extendable-immutable/map'

const map = new Map()
map.setIn('api.funttastic.client.status', new Map())

const initialState = map.toJS()

export { initialState }
