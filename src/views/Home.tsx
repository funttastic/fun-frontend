import PasswordInput from '@/components/PasswordInput'
import { Card, Button, Input } from '@/components/ui'
import CardHeader from './components/CardHeader'
import CardFooter from './components/CardFooter'
import { useEffect } from 'react'

const Home = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                await import('@/model/service/recurrent')
            } catch (errors) {
                console.log(errors)
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            <div className="flex flex-col flex-auto items-center gap-4 lg:flex-row lg:justify-normal lg:items-stretch">
                <Card
                    header="Funttastic Client"
                    headerExtra={<CardHeader target="fun-client" />}
                    footer={<CardFooter target="fun-client" />}
                    className="w-96"
                >
                    <p></p>
                    <div>
                        <div className="flex gap-2 justify-center items-center mt-2">
                            <PasswordInput />
                            <Button size="sm" color="emerald" variant="solid">
                                Add Wallet
                            </Button>
                        </div>
                        <div className="flex gap-2 justify-center items-center mt-2">
                            <Input placeholder="Adress" />
                            <Button size="sm" color="red" variant="solid">
                                Remove Wallet
                            </Button>
                        </div>
                    </div>
                </Card>
                <Card
                    header="Hummingbot Gateway"
                    headerExtra={<CardHeader target="hb-gateway" />}
                    footer={<CardFooter target="hb-gateway" />}
                    className="w-96"
                >
                    <p></p>
                </Card>
                <Card
                    header="Hummingbot Client"
                    headerExtra={<CardHeader target="hb-client" />}
                    footer={<CardFooter target="hb-client" />}
                    className="w-96"
                >
                    <p></p>
                </Card>
            </div>
        </div>
    )
}

export default Home
