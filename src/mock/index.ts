import { createServer } from 'miragejs'

export default function mockServer({ environment = 'test' }) {
    return createServer({
        environment,
        seeds(server) {
            server.db.loadData({
                status: [
                    {
                        'fun-client': {
                            status: '',
                            message: '',
                        },
                        'hb-gateway': {
                            status: '',
                            message: '',
                        },
                        'hb-client': {
                            status: '',
                            message: '',
                        },
                    },
                ],
            })
        },
        routes() {
            this.get('api/status', (schema) => schema.db.status)
            this.get('api/wallet/add')
        },
    })
}
