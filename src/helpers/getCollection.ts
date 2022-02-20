import * as nearAPI from 'near-api-js'
function bytesJsonStringify(input) {
    return Buffer.from(JSON.stringify(input))
}

const { providers } = nearAPI
const provider = new providers.JsonRpcProvider('https://rpc.testnet.near.org')


export default async function getState() {
    const serializedArgs = bytesJsonStringify({
        account_id: 'nft-example.dellwatson.testnet',
        limit: 10,
    }).toString('base64')

    const rawResult = await provider.query({
        request_type: 'call_function',
        account_id: 'nft-example.dellwatson.testnet',
        method_name: 'nft_tokens_for_owner',
        args_base64: serializedArgs,
        finality: 'optimistic',
    })

    // format result
    const res = JSON.parse(Buffer.from(rawResult.result).toString())
    console.log(res, 'res result')
    return res
}