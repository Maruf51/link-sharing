import { NextPage } from 'next'
import { twMerge } from 'tailwind-merge';

interface Props {
    className?: string,
    name: string | React.ReactNode,
    disabled?: boolean,
    variant?: 'fill' | 'outline',
    handler?: boolean,
    handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const PrimaryButton: NextPage<Props> = ({ className, name, disabled, variant = 'outline', handler = false, handleClick }) => {
    return (
        <>
            {
                handler ? <button
                    className={twMerge('border border-[#633aff] rounded-md text-[#633aff] p-2 duration-300 hover:text-white hover:bg-[#633aff] disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-[#633aff] disabled:text-white', variant === 'fill' && 'bg-[#633aff] text-white ', className)}
                    type='button'
                    disabled={disabled || false}
                    onClick={handleClick}
                >
                    {name}
                </button>
                    :
                    <button
                        className={twMerge('border border-[#633aff] rounded-md text-[#633aff] p-2 duration-300 hover:text-white hover:bg-[#633aff] disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-[#633aff] disabled:text-white', variant === 'fill' && 'bg-[#633aff] text-white ', className)}
                        type='submit'
                        disabled={disabled || false}
                    // onClick={handleClick}
                    >
                        {name}
                    </button>
            }
        </>
    )
}

export default PrimaryButton