import { combineReducers, CombinedState, AnyAction, Reducer } from 'redux'
import auth, { AuthState } from './slices/auth'
import base, { BaseState } from './slices/base'
import locale, { LocaleState } from './slices/locale/localeSlice'
import theme, { ThemeState } from './slices/theme/themeSlice'
import RtkQueryService from '@/services/RtkQueryService'
import '@/model/state/redux/actions/types'
import '@/model/state/redux/actions/creators'
import '@/model/state/redux/actions/bounds'
import { initialState as funttasticState } from '@/model/state/redux/store/initial-state'
import { rootReducer as funttasticReducer } from '@/model/state/redux/reducers/root.reducer'

export type RootState = CombinedState<{
    auth: CombinedState<AuthState>
    base: CombinedState<BaseState>
    locale: LocaleState
    theme: ThemeState
    /* eslint-disable @typescript-eslint/no-explicit-any */
    [RtkQueryService.reducerPath]: any,
    app: funttasticState
}>

export interface AsyncReducers {
    [key: string]: Reducer<any, AnyAction>
}

const staticReducers = {
    auth,
    base,
    locale,
    theme,
    [RtkQueryService.reducerPath]: RtkQueryService.reducer,
    app: funttasticReducer
}

const rootReducer =
    (asyncReducers?: AsyncReducers) =>
    (state: RootState, action: AnyAction) => {
        const combinedReducer = combineReducers({
            ...staticReducers,
            ...asyncReducers,
        })
        return combinedReducer(state, action)
    }

export default rootReducer
