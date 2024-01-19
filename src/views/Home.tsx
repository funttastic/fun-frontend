import { Button, Input } from '@/components/ui'
import { IoPlay } from 'react-icons/io5'
import { TbHandStop } from 'react-icons/tb'

type LogMessageProps = {
    message: string
    time: string
}

const log = [
    {
        message: 'Hello World',
        time: '10:00 AM',
    },
    {
        message: 'Stop',
        time: '11:00 AM',
    },
    {
        message: 'Teste',
        time: '12:00 AM',
    },
]

const Home = () => {
    return (
        <div className="flex flex-col">
            <div className="flex gap-2">
                <Button variant="solid" color="green" icon={<IoPlay />}>
                    <span>Start</span>
                </Button>
                <Button variant="solid" color="red" icon={<TbHandStop />}>
                    <span>Stop</span>
                </Button>
            </div>

            <div className="w-full bg-white border-[1px] border-gray-300 min-h-[20rem] p-4 my-4">
                <div className="flex flex-col gap-4">
                    {log.map((item, index) => (
                        <LogMessage
                            key={index}
                            message={item.message}
                            time={item.time}
                        />
                    ))}
                </div>
            </div>

            <div className="flex gap-4">
                <Input placeholder="Password" />
                <Button variant="solid">Add Wallet</Button>
            </div>
        </div>
    )
}

const LogMessage = ({ message, time }: LogMessageProps) => {
    return (
        <div className="flex gap-4">
            <span className="text-gray-400">{time}</span>
            <span>{message}</span>
        </div>
    )
}

export default Home
