import { useState } from 'react'
import Input from '@/components/ui/Input'
import { HiOutlineEyeOff, HiOutlineEye } from 'react-icons/hi'
import type { MouseEvent, ChangeEvent } from 'react'

const PasswordInput = (props) => {
    const [inputValue, inputSetValue] = useState('')

    const inputOnChange = (e: ChangeEvent<HTMLInputElement>) =>
        inputSetValue(e.target.value)

    const [pwInputType, setPwInputType] = useState('password')

    const onPasswordInputClick = (e: MouseEvent) => {
        e.preventDefault()
        setPwInputType(pwInputType === 'password' ? 'text' : 'password')
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

    return (
        <div>
            <Input
                type={pwInputType}
                suffix={inputIcon}
                placeholder="Mnemonic"
                value={inputValue}
                onChange={inputOnChange}
            />
        </div>
    )
}

export default PasswordInput
