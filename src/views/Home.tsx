import PasswordInput from '@/components/PasswordInput'
import { Card } from '@/components/ui'
import { Button } from '@/components/ui'
import { HiCheckCircle } from 'react-icons/hi'
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
        <div className="">
            <div className="flex flex-col flex-auto items-center gap-4 lg:flex-row lg:justify-normal lg:items-stretch">
                <Card
                    header="Funttastic Client"
                    headerExtra={<CardHeader target="fun-client" />}
                    footer={<CardFooter target="fun-client" />}
                    className="w-96"
                >
                    <p></p>
                    <div className="flex gap-2 justify-center items-center mt-2">
                        <PasswordInput />
                        <Button size="sm" color="emerald" variant="solid">
                            Add Wallet
                        </Button>
                    </div>
                </Card>
                <Card
                    header="Hummingbot Gateway"
                    headerExtra={
                        <span className="flex items-center">
                            <span className="mr-1 font-semibold">Status:</span>
                            <span className="text-emerald-500 text-xl">
                                <HiCheckCircle />
                            </span>
                        </span>
                    }
                    footer={<CardFooter />}
                    className="w-96"
                >
                    <p></p>
                </Card>
                <Card
                    header="Hummingbot Client"
                    headerExtra={
                        <span className="flex items-center">
                            <span className="mr-1 font-semibold">Status:</span>
                            <span className="text-emerald-500 text-xl">
                                <HiCheckCircle />
                            </span>
                        </span>
                    }
                    footer={<CardFooter />}
                    className="w-96"
                >
                    <p></p>
                </Card>
            </div>
        </div>
    )
}

export default Home
