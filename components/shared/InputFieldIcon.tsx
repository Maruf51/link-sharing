import { NextPage } from 'next'
import { FaLink } from 'react-icons/fa'

interface Props {
    data: {
        label: string,
        name: string,
        type: string,
        placeholder: string,
        value: string
    },
    required?: boolean,
    onChangeHandler: (e: any) => void
}

const InputFieldIcon: NextPage<Props> = ({ data, required, onChangeHandler }) => {
    const { label, name, type, placeholder, value } = data
    return (
        <div className='flex flex-col'>
            <label className='text-base' htmlFor={name}>{label}</label>
            <div className='relative w-full'>
                <input
                    className='border w-full h-11 pl-11 pr-3 text-sm border-gray-200 rounded-md outline-none text-slate-600'
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    required={required || true}
                    onChange={onChangeHandler}
                />
                <FaLink className='w-11 h-11 absolute top-0 left-0 p-3' />
            </div>
        </div>
    )
}

export default InputFieldIcon