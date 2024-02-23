/* import { getStatus } from '@/model/service/api' */
import { dispatch } from '@/model/state/redux/store'
import { apiGetServiceStatus } from '@/mock/service'

function minuteByMinute() {
    setInterval(async () => {
        try {
            const response = await apiGetServiceStatus()
            const payload = response.data
            dispatch('api.funttastic.client.updateStatus', payload)
        } catch (exception) {
            console.error('Error fetching data:', exception)
        }
    }, 5 * 1000)
}

minuteByMinute()
