import { useState } from 'react'
import Input from '@/components/ui/Input'
import { HiOutlineEyeOff, HiOutlineEye } from 'react-icons/hi'
import type { MouseEvent } from 'react'

const PasswordInput = () => {
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
            />
        </div>
    )
}

export default PasswordInput
