export { mockServer as default } from './mock'
/* import { createServer } from 'miragejs'

export default function mockServer({ environment = 'test' }) {
    return createServer({
        environment,
        routes() {
            this.get('api/status', () => ({
                status: [],
            }))
        },
    })
}
 */
