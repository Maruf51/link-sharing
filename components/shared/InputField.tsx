import { NextPage } from 'next'

interface Props {
    data: any,
    required?: boolean,
    onChangeHandler?: (e: any) => void
}

const InputField: NextPage<Props> = ({ data, required, onChangeHandler }) => {
    const { label, name, type, placeholder } = data
    return (
        <div className='flex flex-col'>
            <label className='text-base' htmlFor={name}>{label}</label>
            <input
                className='border text-sm border-slate-300 text-slate-600 px-3 py-2.5 sm:py-2 rounded-md outline-none focus:border-[#633aff] duration-300'
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
            />
        </div>
    )
}

export default InputField