import { NextPage } from 'next'
import { twMerge } from 'tailwind-merge'

interface Props {
    data: any,
    required?: boolean,
    onChangeHandler?: (e: any) => void,
    disabled?: boolean,
    className?: string,
    labelClassName?: string,
    inputClassName?: string
}

const InputField: NextPage<Props> = ({ data, required, onChangeHandler, disabled, className, labelClassName, inputClassName }) => {
    const { label, name, type, placeholder } = data
    return (
        <div className={twMerge('flex flex-col', className)}>
            <label className={twMerge('text-base col-span-1', labelClassName)} htmlFor={name}>{label}</label>
            <input
                className={twMerge('border text-sm border-slate-300 text-slate-600 px-3 py-2.5 sm:py-2 rounded-md outline-none focus:border-[#633aff] duration-300 col-span-2', inputClassName)}
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                required={required || true}
                defaultValue={data.defaultValue || ''}
                onChange={(e: any) => {
                    if (onChangeHandler) {
                        onChangeHandler(e)
                    }
                }}
                disabled={disabled || false}
            />
        </div>
    )
}

export default InputField