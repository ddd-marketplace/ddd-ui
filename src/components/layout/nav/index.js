import { Disclosure } from '@headlessui/react'
import Link from 'next/link'
import useStore from '@/helpers/store'
import UserMenu from './UserMenu'
import nightwind from 'nightwind/helper'
import Tippy from '@tippyjs/react'

const Nav = () => {
  const { darkMode } = useStore((state) => ({
    darkMode: state.darkMode,
  }))

  const toggleDarkMode = () => {
    nightwind.toggle()
    useStore.setState({
      darkMode: !darkMode,
    })
  }

  return (
    <Disclosure as='nav' className='bg-white border-b border-gray-200'>
      {({ open }) => (
        <>
          <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
            <div className='flex justify-between h-16'>
              <div className='flex'>
                <div className='flex items-center flex-shrink-0'>
                  <Link href='/'>
                    <a
                      aria-label='Go Home'
                      className='font-bold text-fuchsia-500'
                    >
                      DDD Marketplace
                      {/* <Logo width='70' darkMode={darkMode} /> */}
                    </a>
                  </Link>
                </div>

                <div className='items-center hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8'>
                  {/* middle */}
                </div>
              </div>
              <div className='flex gap-2'>
                <Tippy content='Toggle Dark Mode'>
                  <button
                    onClick={toggleDarkMode}
                    className='text-gray-500 border-transparent hover:border-gray-300 hover:text-gray-700'
                  >
                    {darkMode ? (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-6 h-6'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-6 h-6'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                        />
                      </svg>
                    )}
                  </button>
                </Tippy>

                {/* <div>Test network</div> */}

                <UserMenu />
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  )
}

export default Nav
