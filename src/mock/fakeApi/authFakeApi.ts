import { Server, Response } from 'miragejs'
import uniqueId from 'lodash/uniqueId'
import isEmpty from 'lodash/isEmpty'

const status = {
    'fun-client': 'unknown',
    'hb-gateway': 'unknown',
    'hb-client': 'unknown',
}

export default function authFakeApi(server: Server, apiPrefix: string) {
    server.post(`${apiPrefix}/auth/signIn`, (schema, { requestBody }) => {
        const { username, password } = JSON.parse(requestBody)
        const user = schema.db.signInUserData.findBy({
            accountUserName: username,
            password,
        })
        console.log('user', user)
        if (user) {
            const { avatar, userName, email, authority } = user
            return {
                user: { avatar, userName, email, authority },
                token: 'wVYrxaeNa9OxdnULvde1Au5m5w63',
            }
        }
        return new Response(
            401,
            { some: 'header' },
            { message: 'Invalid email or password!' },
        )
    })

    server.post(`${apiPrefix}/auth/signOut`, () => {
        return true
    })

    server.post(`${apiPrefix}/auth/signUp`, (schema, { requestBody }) => {
        const { userName, password, email } = JSON.parse(requestBody)
        const userExist = schema.db.signInUserData.findBy({
            accountUserName: userName,
        })
        const emailUsed = schema.db.signInUserData.findBy({ email })
        const newUser = {
            avatar: '/img/avatars/thumb-1.jpg',
            userName,
            email,
            authority: ['admin', 'user'],
        }
        if (!isEmpty(userExist)) {
            const errors = [
                { message: '', domain: 'global', reason: 'invalid' },
            ]
            return new Response(
                400,
                { some: 'header' },
                { errors, message: 'User already exist!' },
            )
        }

        if (!isEmpty(emailUsed)) {
            const errors = [
                { message: '', domain: 'global', reason: 'invalid' },
            ]
            return new Response(
                400,
                { some: 'header' },
                { errors, message: 'Email already used' },
            )
        }

        schema.db.signInUserData.insert({
            ...newUser,
            ...{ id: uniqueId('user_'), password, accountUserName: userName },
        })
        return {
            user: newUser,
            token: 'wVYrxaeNa9OxdnULvde1Au5m5w63',
        }
    })

    server.post(`${apiPrefix}/auth/refresh`, () => {
      return true
    })

    server.post(`${apiPrefix}/auth/forgotPassword`, () => {
        return true
    })

    server.post(`${apiPrefix}/auth/resetPassword`, () => {
        return true
    })

    server.get(`${apiPrefix}/service/status`, () => {
        return status
    })

    server.post(
        `${apiPrefix}/service/start`,
        async (schema, { requestBody }) => {
            const { target: id } = JSON.parse(requestBody)

            console.log('/beginning', status, id)

            status[id] = 'starting'
            console.log('/starting', status)

            await new Promise((resolve) => setTimeout(resolve, 5000))
            status[id] = 'started'
            console.log('/started', status)

            await new Promise((resolve) => setTimeout(resolve, 5000))
            status[id] = 'running'
            console.log('/running', status)

            await new Promise((resolve) => setTimeout(resolve, 5000))
            status[id] = 'idle'
            console.log('/idle', status)

            console.log('/end', status, id)
        },
    )

    server.post(
        `${apiPrefix}/service/stop`,
        async (schema, { requestBody }) => {
            const { target: id } = JSON.parse(requestBody)

            console.log('/beginning', status, id)

            status[id] = 'stopping'
            console.log('/stopping', status)

            await new Promise((resolve) => setTimeout(resolve, 5000))
            status[id] = 'stopped'
            console.log('/stopped', status)

            console.log('/end', status, id)
        },
    )

    server.post(`${apiPrefix}/wallet/add`, async (schema, { requestBody }) => {
        console.log(requestBody)
    })
}
