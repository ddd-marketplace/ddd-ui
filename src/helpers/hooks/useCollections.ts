import React, {
    useState,
    createContext,
    useCallback,
    useMemo,
    useEffect,
} from 'react'
import * as nearAPI from 'near-api-js'

function bytesJsonStringify(input) {
    return Buffer.from(JSON.stringify(input))
}

const { providers } = nearAPI
const provider = new providers.JsonRpcProvider('https://rpc.testnet.near.org')

const useCollections = (account_id: string, limit: number | unknown = 10) => {
    const [collections, setCollections] = useState<[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const getState = useCallback(async () => {
        setLoading(true)
        const serializedArgs = bytesJsonStringify({
            account_id,
            limit,
        }).toString('base64')

        try {
            const rawResult = await provider.query({
                request_type: 'call_function',
                account_id: "ddd-protocol.testnet",
                method_name: 'nft_tokens_for_owner',
                args_base64: serializedArgs,
                finality: 'optimistic',
            })

            const res = JSON.parse(Buffer.from(rawResult?.result).toString())
            setCollections(res)
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
        collections,
        onRefresh: getState
    }
}

export default useCollections
