import React, { useState, useCallback, useEffect } from 'react'
import * as nearAPI from 'near-api-js'

function bytesJsonStringify(input) {
  return Buffer.from(JSON.stringify(input))
}

const { providers } = nearAPI
const provider = new providers.JsonRpcProvider('https://rpc.testnet.near.org')

const useInfo = (contract_name: string, method_name: string, args: any) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState<boolean>(false)

  const getState = useCallback(async () => {
    setLoading(true)

    const serializedArgs = bytesJsonStringify(args).toString('base64')

    try {
      const rawResult = await provider.query({
        request_type: 'call_function',
        account_id: contract_name,
        method_name,
        args_base64: serializedArgs,
        finality: 'optimistic',
      })

      const res = JSON.parse(Buffer.from(rawResult?.result).toString())
      setData(res)
      setLoading(false)
    } catch (e) {
      console.log(e, 'e')
      // setLoading(false)
    }
  }, [])

  useEffect(() => {
    getState()
  }, [])

  return {
    loading,
    data,
    onRefresh: getState,
  }
}

export default useInfo
