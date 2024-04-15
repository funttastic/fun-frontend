import PasswordInput from '@/components/PasswordInput'
import { Button } from '@/components/ui'
import { apiPostAddWallet } from '@/mock/service'
import { useState, ChangeEvent } from 'react'

const InputAndButton = (props) => {
    const [inputValue, inputSetValue] = useState('')

    const inputOnChange = (e: ChangeEvent<HTMLInputElement>) =>
        inputSetValue(e.target.value)

    const onButtonClick = (event:any) => {
        console.log(event)
        apiPostAddWallet(event)
    }

    return (
        <div className="flex gap-2 justify-center items-center mt-2">
            <PasswordInput
                placeholder={props.inputPlaceholder}
                type={props.inputType}
                value={inputValue}
            />
            <Button
                type="submit"
                size="sm"
                color="emerald"
                variant="solid"
                onClick={() => onButtonClick(inputValue)}
            >
                {props.buttonTitle}
            </Button>
        </div>
    )
}

export default InputAndButton
