import { dispatch } from '@/model/state/redux/store'
import { apiGetServiceStatus, apiPostAuthLogin } from "@/model/service/api/funttastic";

const executeAndSetInterval = (targetFunction: any, interval: number) => {
    targetFunction();
    setInterval(targetFunction, interval);
}

const recurrentFunctions = {
    '5s': () => {
        const targetFunction  = async() => {
            try {
                const response = await apiGetServiceStatus()

                dispatch('api.funttastic.client.updateStatus', response)
            } catch (exception) {
                console.error(exception)
            }
        }

        setInterval(targetFunction, 5*1000);
    },
    '10min': () => {
        const targetFunction  = async() => {
            try {
                const response = await apiPostAuthLogin()

                dispatch('api.funttastic.client.updateToken', response)
            } catch (exception) {
                console.error(exception)
            }
        }

        executeAndSetInterval(targetFunction, 10*60*1000);
    }
}

for(const [_id, func] of Object.entries(recurrentFunctions)) {
    func()
}
