import ApiService from '../services/ApiService'

export async function apiGetServiceStatus() {
    return await ApiService.fetchData({
        url: '/service/status',
        method: 'get',
    })
}

export async function apiPostServiceStart(data) {
    return ApiService.fetchData({
        url: '/service/start',
        method: 'post',
        data,
    })
}

export async function apiPostServiceStop(data) {
    return ApiService.fetchData({
        url: '/service/stop',
        method: 'post',
        data,
    })
}

export async function apiPostAddWallet(data) {
    return ApiService.fetchData({
        url: '/wallet/add',
        method: 'post',
        data,
    })
}

export async function apiDeleteRemoveWallet(data) {
    return ApiService.fetchData({
        url: '/wallet/remove',
        method: 'delete',
        data,
    })
}
