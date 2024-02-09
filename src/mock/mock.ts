import { createServer } from 'miragejs'
import appConfig from '@/configs/app.config'

import { signInUserData } from './data/authData'

import { authFakeApi } from './fakeApi'

const { apiPrefix } = appConfig

export function mockServer({ environment = 'test' }) {
    return createServer({
        environment,
        seeds(server) {
            server.db.loadData({
                signInUserData,
                status: [
                    {
                        'fun-client': {
                            status: 'stopped',
                            message: 'Stopped.',
                        },
                        'hb-gateway': {
                            status: 'stopped',
                            message: 'Stopped.',
                        },
                        'hb-client': {
                            status: 'stopped',
                            message: 'Stopped.',
                        },
                    },
                ],
            })
        },
        routes() {
            this.urlPrefix = ''
            this.namespace = ''
            this.passthrough((request) => {
                const isExternal = request.url.startsWith('http')
                return isExternal
            })
            this.passthrough()

            authFakeApi(this, apiPrefix)
        },
    })
}
