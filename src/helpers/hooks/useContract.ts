import React, {
  useState,
  createContext,
  useCallback,
  useMemo,
  useEffect,
} from 'react'
import * as nearAPI from 'near-api-js'
import useWallet from './useWallet'
import Big from 'big.js';
const SUGGESTED_DONATION = '0';
const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();


export const CHANGE_METHODS = ['nft_mint', "nft_approve", "offer", "get_sale"]
export type change_methods = 'nft_mint' | "nft_approve" | "offer" | "get_sale"

const useContract = (contractName: string) => {
  const [contract, setContract] = useState(null)
  const [loading, setLoading] = useState(false)
  const { walletConnection } = useWallet()


  useEffect(() => {
    //load contract with
    const initContract = async () => {
      setLoading(true)
      console.log('loading')

      try {
        const x = await new nearAPI.Contract(
          //   account
          walletConnection.account(),
          contractName,
          {
            // View methods are read-only – they don't modify the state, but usually return some value
            viewMethods: [],
            // Change methods can modify the state, but you don't receive the returned value when called
            changeMethods: CHANGE_METHODS,
            sender: walletConnection?.getAccountId(),
          }
        )
        // console.log(x, 'x conract')
        setContract(x)
        setLoading(false)
      } catch (e) {
        console.log(e, 'error load contract')
        setLoading(false)
      }
    }
    initContract()
  }, [walletConnection])


  const callContract = async (fnName: change_methods, value: object, deposit: string = "0.015", gas = 30) => {
    setLoading(true)

    try {
      //check if it's in array method ?
      const res = await contract[fnName](
        value,
        Big(gas).times(10 ** 13).toFixed(), // attached GAS (optional)
        Big(deposit)
          .times(10 ** 24)
          .toFixed()
        // 1000000000000000000000000 // attached deposit in yoctoNEAR (optional)
      );
      console.log(res, 'res')
      setLoading(false)
      window.location.reload(true)
      return res

    } catch (e) {
      console.log(e, 'error call fn contract')
      setLoading(false)
    }
  }

  return {
    contract,
    loading,
    callContract
  }
}

export default useContract
