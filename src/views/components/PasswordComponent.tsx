import React, { useState } from 'react'
import { Input, Button, toast, Notification } from '@/components/ui'
import {
    apiPostAddWallet,
    apiDeleteRemoveWallet,
} from '@/model/service/api/funttastic'
import { HiOutlineEyeOff, HiOutlineEye } from 'react-icons/hi'
import type { MouseEvent } from 'react'

const typeMessages = {
    success: 'Wallet added successfully',
    warning: 'Wallet removed successfully',
    danger: 'Error',
    info: 'Info',
}

const PasswordComponent: React.FC = (props) => {
    const [value, setValue] = useState<string>('')
    const [pwInputType, setPwInputType] = useState(props.inputType)
    const { toastType } = props

    const onPasswordInputClick = (e: MouseEvent) => {
        e.preventDefault()
        setPwInputType(pwInputType === 'password' ? 'text' : 'password')
    }

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    const inputIcon = props.inputType === 'password' && (
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
                    {typeMessages[type]}
                </Notification>,
                {
                    placement: placement,
                },
            )
        }
        props.onButtonClick(value)
        openNotification('top-end', toastType)
    }

    return (
        <div className="flex gap-2 justify-center items-center mt-2">
            <Input
                placeholder={props.inputPlaceholder}
                value={value}
                type={pwInputType}
                suffix={inputIcon}
                onChange={onInputChange}
            />
            <Button
                className="w-44"
                size="sm"
                color={props.buttonColor}
                variant="solid"
                onClick={onButtonClick}
            >
                {props.buttonTitle}
            </Button>
        </div>
    )
}

export default PasswordComponent
