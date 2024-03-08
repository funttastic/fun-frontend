import {dispatch} from '@/model/state/redux/store'
import {apiGetServiceStatus, apiPostAuthRefresh} from '@/model/service/api/funttastic'
import axios from "axios";

const executeAndSetInterval = (targetFunction: any, interval: number) => {
    targetFunction();

    return setInterval(targetFunction, interval);
}

const recurrentFunctions = {
    '1s': (handleUnAuthorized?: () => void) => {
        let intervalId: any;

        const targetFunction  = async() => {
            try {
                const response = await apiGetServiceStatus(undefined, handleUnAuthorized)

                const status = response.data;

                dispatch('api.funttastic.client.updateStatus', status)
            } catch (exception) {
                if (axios.isAxiosError(exception)) {
                    if (exception?.response?.status == 401) {
                        clearInterval(intervalId)

                        return
                    }
                }

                console.error(exception)
            }
        }

        intervalId = executeAndSetInterval(targetFunction, 1000);
    },
    '10min': (handleUnAuthorized?: () => void) => {
        let intervalId: any;

        const targetFunction  = async() => {
            try {
                await apiPostAuthRefresh(undefined, handleUnAuthorized)

                // const response = await apiPostAuthRefresh()
                // const { token } = response.data
                // dispatch('api.funttastic.client.updateToken', token)
            } catch (exception) {
                if (axios.isAxiosError(exception)) {
                    if (exception?.response?.status == 401) {
                        clearInterval(intervalId)

                        return
                    }
                }

                console.error(exception)
            }
        }

        intervalId = setInterval(targetFunction, 10*60*1000);
    }
}

export const configure = (handleUnAuthorized?: () => void) => {
    for(const [_id, func] of Object.entries(recurrentFunctions)) {
        func(handleUnAuthorized)
    }
}
