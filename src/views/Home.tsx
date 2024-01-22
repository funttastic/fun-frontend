import { Card } from '@/components/ui'
import { Button } from '@/components/ui'
import { Input } from '@/components/ui'
import { Switcher } from '@/components/ui'
import { HiCheckCircle } from 'react-icons/hi'

const Home = () => {
    const headerExtraContent = (
        <div className="flex items-center">
            <span className="mr-1 font-semibold">Status:</span>
            <span className="text-emerald-500 text-xl">
                <HiCheckCircle />
            </span>
        </div>
    )

    const cardFooter = (
        <div className="flex">
            <Switcher checkedContent="Start" color="green-500" />
        </div>
    )

    return (
        <div>
            <div className="flex gap-4">
                <Card
                    header="Funttastic Client"
                    headerExtra={headerExtraContent}
                    footer={cardFooter}
                >
                    <p></p>
                    <div className="flex gap-2 justify-center items-center mt-2">
                        <Input placeholder="Mnemonic" />
                        <Button size="sm">Add Wallet</Button>
                    </div>
                </Card>
                <Card
                    header="Hummingbot Gateway"
                    headerExtra={headerExtraContent}
                    footer={cardFooter}
                >
                    <p></p>
                </Card>
                <Card
                    header="Hummingbot Client"
                    headerExtra={headerExtraContent}
                    footer={cardFooter}
                >
                    <p></p>
                </Card>
            </div>
        </div>
    )
}

export default Home
