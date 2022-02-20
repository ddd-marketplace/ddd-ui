import useWallet from '@/helpers/hooks/useWallet'

const UserMenu = ({ user }) => {
  const { currentUser, signIn, signOut } = useWallet()
  // console.log(`##############`, currentUser, 'currentuser', walletConnection)
  return (
    <div className='sm:flex sm:items-center'>
      {currentUser ? (
        <>
          <div className='mx-5 text-black'>{currentUser?.accountId}</div>
          <button
            className='cursor-pointer relative items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-transparent shadow-sm rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500'
            onClick={signOut}
          >
            Sign Out
          </button>
        </>
      ) : (
        <a
          onClick={async () => {
            console.log('click sign')
            signIn()
          }}
          className='cursor-pointer relative items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-transparent shadow-sm rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500'
        >
          Connect Wallet
        </a>
      )}
    </div>
  )
}

export default UserMenu
