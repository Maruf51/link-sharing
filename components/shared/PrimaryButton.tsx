import { NextPage } from 'next'
import { twMerge } from 'tailwind-merge';

interface Props {
    className?: string,
    name: string,
    disabled?: boolean,
    // handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const PrimaryButton: NextPage<Props> = ({ className, name, disabled }) => {
    return (
        <button
            className={twMerge('border border-[#633aff] rounded-md text-[#633aff] p-2 duration-300 hover:text-white hover:bg-[#633aff] disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-[#633aff] disabled:text-white', className)}
            type='submit'
            disabled={disabled || false}
            // onClick={handleClick}
        >
            {name}
        </button>
    )
}

export default PrimaryButton