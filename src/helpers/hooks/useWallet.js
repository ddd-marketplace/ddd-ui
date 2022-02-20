import React, { useState, useCallback, useMemo, useEffect } from 'react'
import * as nearAPI from 'near-api-js'

const nearConfig = {
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  contractName: 'nft-example.dellwatson.testnet',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
}

const useWallet = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [walletConnection, setWalletConnection] = useState(null)

  const _init = useCallback(async () => {
    const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore()

    const nearx = await nearAPI.connect({ keyStore, ...nearConfig })

    // Initialize wallet connection
    const walletConnectionx = new nearAPI.WalletConnection(nearx)
    // console.log('walletConnection initialize', walletConnectionx)
    //wallet
    setWalletConnection(walletConnectionx)
    if (walletConnectionx.getAccountId()) {
      setCurrentUser({
        // Gets the accountId as a string
        accountId: walletConnectionx.getAccountId(),
        // Gets the user's token balance
        balance: (await walletConnectionx.account().state()).amount,
      })
    }
  }, []) //testing >

  useEffect(() => {
    _init()
  }, [])

  const signIn = () => {
    walletConnection.requestSignIn(
      {
        contractId: nearConfig.contractName, //inarray?
        // methodNames: [contract.addMessage.name],
      }, //contract requesting access
      'Near Example NFT DW', //optional name
      null, //optional URL to redirect to if the sign in was successful
      null //optional URL to redirect to if the sign in was NOT successful
    )
  }

  const signOut = () => {
    walletConnection.signOut()
    window.location.replace(window.location.origin)
  }

  return {
    currentUser,
    walletConnection,
    signIn,
    signOut,
  }
}

export default useWallet
