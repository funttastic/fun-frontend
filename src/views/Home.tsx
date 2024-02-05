import PasswordInput from '@/components/PasswordInput'
import { Card } from '@/components/ui'
import { Button } from '@/components/ui'
import { Switcher } from '@/components/ui'
import {
    HiCheckCircle,
    HiMinusCircle,
    HiDotsCircleHorizontal,
} from 'react-icons/hi'
import { Status } from '@/model/enum/status'

const Home = () => {
    const statuses = Status.list.toJS()
    console.log(statuses[2].id)

    const statusColor = {
        stopped: 'text-red-500',
        starting: 'text-green-500',
    }

    const HeaderExtraContent = ({ status = 'stopped' }) => (
        <div className="flex items-center">
            <span className="mr-1 font-semibold">Status:</span>
            <span className={`${statusColor[status]}`}>
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
                    headerExtra={<HeaderExtraContent status={statuses[1].id} />}
                    footer={cardFooter}
                >
                    <p></p>
                    <div className="flex gap-2 justify-center items-center mt-2">
                        <PasswordInput />
                        <Button size="sm">Add Wallet</Button>
                    </div>
                </Card>
                <Card
                    header="Hummingbot Gateway"
                    headerExtra={<HeaderExtraContent status={statuses[0].id} />}
                    footer={cardFooter}
                >
                    <p></p>
                </Card>
                <Card
                    header="Hummingbot Client"
                    headerExtra={<HeaderExtraContent status={statuses[1].id} />}
                    footer={cardFooter}
                >
                    <p></p>
                </Card>
            </div>
        </div>
    )
}

export default Home
