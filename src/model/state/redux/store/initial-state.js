import {Map} from '@/model/helper/extendable-immutable/map'

let initialState = new Map()

initialState.setIn('api.funttastic.client.status', new Map())

export {initialState}
