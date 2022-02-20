import dynamic from 'next/dynamic'
import Layout from '@/components/layout/'
import AssetInfo from '@/components/AssetInfo'
import * as nearAPI from 'near-api-js'
import Collections from '@/components/collections'

const Viewer = dynamic(() => import('@/components/canvas/Model'), {
  ssr: true,
})

const Page = ({ notFound, res, query }) => {
  if (notFound)
    return (
      <Layout>
        <div>Token not found</div>
      </Layout>
    )

  return (
    <Layout>
      <main className='block my-10 sm:grid sm:grid-cols-3 gap-x-4 gap-y-8'>
        <div
          className='relative min-w-full min-h-full border col-span-2 rounded-md'
          // border radius
        >
          {/* check if it's not 3D model? */}
          <Viewer {...res} id={res.token_id} />
        </div>

        <AssetInfo {...res} />
      </main>

      {/* collections */}
      {query?.slug && <Collections {...{ collectionName: query?.slug }} />}
    </Layout>
  )
}

export default Page

function bytesJsonStringify(input) {
  return Buffer.from(JSON.stringify(input))
}

export async function getServerSideProps({ query }) {
  const { providers } = nearAPI
  const provider = new providers.JsonRpcProvider('https://rpc.testnet.near.org')

  const serializedArgs = bytesJsonStringify({
    token_id: query?.token_id,
  }).toString('base64')

  try {
    const rawResult = await provider.query({
      request_type: 'call_function',
      account_id: 'ddd-protocol.testnet',
      method_name: 'nft_token',
      args_base64: serializedArgs,
      finality: 'optimistic',
    })

    const res = JSON.parse(Buffer.from(rawResult?.result).toString())

    return {
      props: {
        query,
        res,
      },
    }
  } catch (e) {
    console.log(e, 'e')
    // setLoading(false)
    return {
      props: {
        query,
        notFound: true,
      },
    }
  }
  // //   validate
  //     return {
  //       props: {
  //         notFound: true,
  //       },
  //   }
}
