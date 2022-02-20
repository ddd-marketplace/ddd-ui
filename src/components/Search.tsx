import { SearchIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router';
import { useState } from 'react';
const Search = () => {
    const router = useRouter()
    const [state, setState] = useState('')
    const placeholder = `Search for account`
    return (
        <div className='items-center block mt-6 sm:flex gap-10'>
            <label htmlFor='search' className='sr-only'>
                {placeholder}
            </label>
            <div className='relative flex-grow rounded-md shadow-sm'>
                <input
                    type='search'
                    name='search'
                    id='search'
                    value={state}
                    onChange={(e) => {
                        e.preventDefault()
                        setState(e.target.value)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            router.push(`/profile/${state}`)
                        }
                    }}
                    className='block w-full pr-10 text-gray-800 bg-white border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
                    placeholder={placeholder}
                />
                <div

                    className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                    <SearchIcon
                        onClick={() => {
                            router.push(`/profile/${state}`)
                        }}
                        className='w-5 h-5 text-gray-400' aria-hidden='true' />
                </div>
            </div>
        </div>
    )
}

export default Search