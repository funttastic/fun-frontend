import ApiService from '../services/ApiService'

export async function apiGetUsers() {
    return ApiService.fetchData<any>({
        url: '/status',
        method: 'get',
    })
}
