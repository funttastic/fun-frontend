import React, { useState } from 'react'
import { Input, Button, toast, Notification } from '@/components/ui'
import { apiPostAddWallet } from '@/model/service/api/funttastic'
import { HiOutlineEyeOff, HiOutlineEye } from 'react-icons/hi'
import type { MouseEvent } from 'react'

const PasswordComponent: React.FC = () => {
    const [password, setPassword] = useState<string>('')
    const [pwInputType, setPwInputType] = useState('')

    const onPasswordInputClick = (e: MouseEvent) => {
        e.preventDefault()
        setPwInputType(pwInputType === 'password' ? 'text' : 'password')
    }

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const inputIcon = (
        <span
            className="cursor-pointer"
            onClick={(e) => onPasswordInputClick(e)}
        >
            {pwInputType === 'password' ? (
                <HiOutlineEyeOff />
            ) : (
                <HiOutlineEye />
            )}
        </span>
    )

    const onButtonClick = () => {
        const openNotification = (
            placement:
                | 'top-start'
                | 'top-center'
                | 'top-end'
                | 'bottom-start'
                | 'bottom-center'
                | 'bottom-end',
            type: 'success' | 'warning' | 'danger' | 'info',
        ) => {
            toast.push(
                <Notification type={type} title="Success">
                    Wallet added successfully.
                </Notification>,
                {
                    placement: placement,
                },
            )
        }
        apiPostAddWallet(password)
        openNotification('top-end', 'success')
    }

    return (
        <div className="flex gap-2 justify-center items-center mt-2">
            <Input
                placeholder="Mnemonic"
                value={password}
                type={pwInputType}
                suffix={inputIcon}
                onChange={onInputChange}
            />
            <Button
                size="sm"
                color="green"
                variant="solid"
                onClick={onButtonClick}
            >
                Add Wallet
            </Button>
        </div>
    )
}

export default PasswordComponent

// Componente de Input
/* interface InputProps {
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputComponent: React.FC<InputProps> = ({ value, onChange }) => {
    return <input type="password" value={value} onChange={onChange} />
}

// Componente de Botão
interface ButtonProps {
    onClick: () => void
}

const ButtonComponent: React.FC<ButtonProps> = ({ onClick }) => {
    return <button onClick={onClick}>Enviar</button>
} */
