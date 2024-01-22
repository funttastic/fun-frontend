import { Card } from '@/components/ui'
import { Button } from '@/components/ui'
import { Input } from '@/components/ui'
import { HiCheckCircle } from 'react-icons/hi'

const Home = () => {
    const headerExtraContent = (
        <span className="flex items-center">
            <span className="mr-1 font-semibold">Status:</span>
            <span className="text-emerald-500 text-xl">
                <HiCheckCircle />
            </span>
        </span>
    )

    const cardFooter = (
        <div className="flex justify-end">
            <Button
                size="sm"
                className="ltr:mr-2 rtl:ml-2"
                color="green"
                variant="solid"
            >
                Start
            </Button>
            <Button size="sm" variant="solid" color="red">
                Stop
            </Button>
        </div>
    )

    const addWalletButton = (
        <div>
            <Button>Add Wallet</Button>
        </div>
    )

    return (
        <div className="flex flex-row gap-4">
            <div className="flex flex-row justify-around gap-2">
                <Card
                    header="Funttastic Client"
                    headerExtra={headerExtraContent}
                    footer={cardFooter}
                >
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Architecto, corrupti!
                    </p>
                    <div className="flex mt-2">
                        <Input placeholder="Password" />
                        {addWalletButton}
                    </div>
                </Card>
                <Card
                    header="Hummingbot Gateway"
                    headerExtra={headerExtraContent}
                    footer={cardFooter}
                >
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Excepturi, labore.
                    </p>
                </Card>
                <Card
                    header="Hummingbot Client"
                    headerExtra={headerExtraContent}
                    footer={cardFooter}
                >
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Dicta, odit!
                    </p>
                </Card>
            </div>
        </div>
    )
}

export default Home
