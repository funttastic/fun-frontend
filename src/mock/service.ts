import ApiService from '../services/ApiService'

export async function apiGetStatus() {
    return await ApiService.fetchData({
        url: '/status',
        method: 'get',
    })
}

export async function apiPostStart(data) {
    return ApiService.fetchData({
        url: '/start',
        method: 'post',
        data,
    })
}

export async function apiPostStop() {
    return ApiService.fetchData({
        url: '/stop',
        method: 'post',
    })
}
