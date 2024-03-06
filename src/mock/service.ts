import ApiService from '../services/ApiService'

export async function apiPostAuthSignIn() {
    return await ApiService.fetchData({
        method: 'post',
        url: '/auth/signIn',
    })
}

export async function apiPostAuthSignOut() {
    return await ApiService.fetchData({
        method: 'post',
        url: '/auth/signOut',
    })
}

export async function apiPostAuthRefresh() {
    return await ApiService.fetchData({
        method: 'post',
        url: '/auth/refresh',
    })
}

export async function apiGetServiceStatus() {
    return await ApiService.fetchData({
        method: 'get',
        url: '/service/status',
    })
}

export async function apiPostServiceStart(data: any) {
    return ApiService.fetchData({
        method: 'post',
        url: '/service/start',
        data,
    })
}

export async function apiPostServiceStop(data: any) {
    return ApiService.fetchData({
        method: 'post',
        url: '/service/stop',
        data,
    })
}

export async function apiPostAddWallet(data: any) {
    return ApiService.fetchData({
        method: 'post',
        url: '/wallet/add',
        data,
    })
}

export async function apiDeleteRemoveWallet(data: any) {
    return ApiService.fetchData({
        method: 'delete',
        url: '/wallet/remove',
        data,
    })
}
