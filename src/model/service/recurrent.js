import { getStatus } from '@/model/service/api'
import { dispatch } from '@/model/state/redux/store'

function minuteByMinute() {
    setInterval(async () => {
        try {
            const response = await getStatus()
            const payload = response
            dispatch('api.funttastic.client.updateStatus', payload)
        } catch (exception) {
            console.error('Error fetching data:', exception)
        }
    }, 5 * 1000)
}

minuteByMinute()
