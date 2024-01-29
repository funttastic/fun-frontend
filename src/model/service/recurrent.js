import {getStatus} from '@/model/service/api';
import {dispatch} from "@/model/state/redux/store";

function minuteByMinute() {
    setTimeout(async () => {
        try {
            const response = await getStatus();
            const payload = await response.json()
            dispatch('api.funttastic.client.updateStatus', payload)
        } catch (exception) {
            console.error('Error fetching data:', exception);
        }
    }, 60*1000);
}

minuteByMinute();
