export const apiPostAddWallet = async (password: string) => {
    const apiUrl = '/wallet/add'

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password: password,
        }),
    })

    if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
    }

    const data = await response.json()

    return data
}
