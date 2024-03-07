import {dispatch} from '@/model/state/redux/store'
import {apiGetServiceStatus, apiPostAuthRefresh} from "@/model/service/api/funttastic";

// const executeAndSetInterval = (targetFunction: any, interval: number) => {
//     targetFunction();
//     setInterval(targetFunction, interval);
// }

const recurrentFunctions = {
    '5s': () => {
        const targetFunction  = async() => {
            try {
                const response = await apiGetServiceStatus()

                const status = response.data;

                dispatch('api.funttastic.client.updateStatus', status)
            } catch (exception) {
                console.error(exception)
            }
        }

        setInterval(targetFunction, 5*1000);
    },
    '10min': () => {
        const targetFunction  = async() => {
            try {
                await apiPostAuthRefresh()

                // const response = await apiPostAuthRefresh()
                // const { token } = response.data
                // dispatch('api.funttastic.client.updateToken', token)
            } catch (exception) {
                console.error(exception)
            }
        }

        setInterval(targetFunction, 10*60*1000);
    }
}

for(const [_id, func] of Object.entries(recurrentFunctions)) {
    func()
}
