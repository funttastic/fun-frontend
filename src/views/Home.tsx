import PasswordInput from '@/components/PasswordInput'
import { Card, Button, Switcher, Notification, toast } from '@/components/ui'
import { HiCheckCircle } from 'react-icons/hi'
import { useEffect, useState } from 'react'
import { apiGetUsers } from '@/mock/service'

const Home = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])

    const fetchData = async () => {
        try {
            const resp = await apiGetUsers()

            setData(resp.data)
            console.log(resp.data)
        } catch (errors) {
            console.log(errors)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }, [])

    const openNotification = (
        type: 'success' | 'warning' | 'danger' | 'info',
        placement:
            | 'top-start'
            | 'top-center'
            | 'top-end'
            | 'bottom-start'
            | 'bottom-center'
            | 'bottom-end',
    ) => {
        toast.push(
            <Notification
                type={type}
                title={type.charAt(0).toUpperCase() + type.slice(1)}
            />,
            {
                placement: placement,
            },
        )
    }

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
            <Switcher
                unCheckedContent="Stop"
                checkedContent="Start"
                color="green-500"
                onChange={() => {
                    openNotification('success', 'top-end')
                }}
            />
        </div>
    )

    const cardFooterButtons = () => (
        <div className="flex">
            <Button
                size="sm"
                className="ltr:mr-2 rtl:ml-2"
                variant="solid"
                color="green"
                onClick={fetchData}
            >
                Start
            </Button>
            <Button size="sm" variant="solid" color="red">
                Stop
            </Button>
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
                        <PasswordInput />
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
                    footer={cardFooterButtons()}
                >
                    <div className="flex flex-col gap-2 max-h-60 overflow-auto">
                        {isLoading && <h2>Loading...</h2>}
                        {!isLoading && <h2>Ready</h2>}
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Home
