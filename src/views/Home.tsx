import PasswordInput from '@/components/PasswordInput'
import { Card } from '@/components/ui'
import { Button } from '@/components/ui'
import { HiCheckCircle } from 'react-icons/hi'
import Behavior from './components/HeaderExtraContent'
import CardFooter from './components/CardFooter'
import { useEffect, useState } from 'react'
const Home = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                await import('@/model/service/recurrent')
            } catch (errors) {
                console.log(errors)
            }
        }
        console.log(new Date())
        fetchData()
    }, [])

    return (
        <div>
            <div className="flex gap-4">
                <Card
                    header="Funttastic Client"
                    headerExtra={<Behavior />}
                    footer={<CardFooter />}
                >
                    <p></p>
                    <div className="flex gap-2 justify-center items-center mt-2">
                        <PasswordInput />
                        <Button size="sm">Add Wallet</Button>
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
                >
                    <p></p>
                </Card>
            </div>
        </div>
    )
}

export default Home
