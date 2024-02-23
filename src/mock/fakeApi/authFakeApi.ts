import { Server, Response } from 'miragejs'
import uniqueId from 'lodash/uniqueId'
import isEmpty from 'lodash/isEmpty'

const status = {
    'fun-client': {
        status: 'stopped',
        message: 'Stopped',
    },
    'hb-gateway': {
        status: 'stopped',
        message: 'Stopped',
    },
    'hb-client': {
        status: 'stopped',
        message: 'Stopped',
    },
}

export default function authFakeApi(server: Server, apiPrefix: string) {
    server.post(`${apiPrefix}/sign-in`, (schema, { requestBody }) => {
        const { userName, password } = JSON.parse(requestBody)
        const user = schema.db.signInUserData.findBy({
            accountUserName: userName,
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

    server.post(`${apiPrefix}/sign-out`, () => {
        return true
    })

    server.post(`${apiPrefix}/sign-up`, (schema, { requestBody }) => {
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

    server.post(`${apiPrefix}/forgot-password`, () => {
        return true
    })

    server.post(`${apiPrefix}/reset-password`, () => {
        return true
    })

    server.get(`${apiPrefix}/service/status`, () => {
        return status
    })

    server.post(
        `${apiPrefix}/service/start`,
        async (schema, { requestBody }) => {
            const { target } = JSON.parse(requestBody)

            console.log('/beginning', status, target)

            status[target].status = 'starting'
            status[target].message = 'Starting'
            console.log('/starting', status)

            await new Promise((resolve) => setTimeout(resolve, 5000))
            status[target].status = 'started'
            status[target].message = 'Started'
            console.log('/started', status)

            await new Promise((resolve) => setTimeout(resolve, 5000))
            status[target].status = 'running'
            status[target].message = 'Running'
            console.log('/running', status)

            await new Promise((resolve) => setTimeout(resolve, 5000))
            status[target].status = 'idle'
            status[target].message = 'Idle'
            console.log('/idle', status)

            console.log('/end', status, target)
        },
    )

    server.post(
        `${apiPrefix}/service/stop`,
        async (schema, { requestBody }) => {
            const { target } = JSON.parse(requestBody)

            console.log('/beginning', status, target)

            status[target].status = 'stopping'
            status[target].message = 'Stopping'
            console.log('/stopping', status)

            await new Promise((resolve) => setTimeout(resolve, 5000))
            status[target].status = 'stopped'
            status[target].message = 'Stopped'
            console.log('/stopped', status)

            console.log('/end', status, target)
        },
    )
}
