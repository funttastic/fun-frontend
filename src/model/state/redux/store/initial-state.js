import {Map} from '@/model/helper/extendable-immutable/map'

let initialState = new Map()

initialState.setIn('external.api.status', new Map())

export {initialState}
