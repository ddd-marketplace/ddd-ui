import Layout from '@/components/layout/'
import CollectionSwipe from '@/components/collections/CollectionSwipe'
import Search from '@/components/Search'
import Button from '@/components/Button'
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'
import { ErrorBoundary } from 'react-error-boundary'
const Viewer = dynamic(() => import('@/components/canvas/ModelView'), {
  ssr: true,
})

const Index = () => {
  const router = useRouter()

  const res = {
    token_id: 'ddd-1',
    owner_id: 'ddd-trial.testnet',
    metadata: {
      title: 'Trial 3D',
      description: 'good good',
      media: 'https://ipfs.io/ipfs/Qmc8ZocqUUvJHEk9ggXAcXVV3XzJFqNCAwGP2xzHBPWy4s',
      media_hash: null,
      copies: null,
      ori_creator: 'dellwatson.testnet',
      model3d_url: "https://ipfs.io/ipfs/Qmdih1tQVDUhAAXUU1ZVFiN2wgEBzpMCs2NHShSVTeHXvY?filename=Qmdih1tQVDUhAAXUU1ZVFiN2wgEBzpMCs2NHShSVTeHXvY.glb",
      ipfs_meta: null,
      issued_at: null,
      expires_at: null,
      starts_at: null,
      updated_at: null,
      extra: null,
      reference: null,
      reference_hash: null
    },
    approved_account_ids: {},
    royalty: {}
  }

  return (
    <Layout >
      <br />
      <br />
      <div className='md:flex md:flex-row w-full '>
        <div className='w-full'>
          <h1 className='text-8xl font-bold text-fuchsia-500 uppercase'>
            Mint your 3Dmodel art and get your royalties
          </h1>
          <br />
          <Button
            onClick={() => {
              router.push(`/add-asset`)
            }}
          >
            Add Asset Now
          </Button>
        </div>
        <div className='w-full md:w-1/2 md:mt-0  mt-5'>
          <h1 className='text-3xl font-bold text-violet-400 '>
            <ul>
              <ol>Decentralised</ol>
              <ol>DAO</ol>
              <ol>Direct</ol>
            </ul>
          </h1>
          <Search />
          <br />

          {/* <br />
          <br />
          look at our roadmap */}
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className='border p-10 rounded-lg bg-purple-400 md:flex md:flex-row w-full' >
        <div className='w-full'>
          <h1 className='text-5xl font-bold text-white uppercase'>
            This month's top choice:
          </h1>
          <br />
          <div className='text-xl font-medium text-white w-2/3'>
            Iconic Club C 85 shoes are reimagined by Japanese fashion label A Bathing Ape. The classic white upper flashes a camo-pattern BAPE STA™ on the sides of both shoes in alternating colors. Mashups of the Reebok and BAPE® logos stand out on the tongue and on the heel.
          </div>
          <div className='mt-5 text-8xl font-medium text-white'>
            238 Ⓝ
          </div>
        </div>
        <div className='w-full md:w-1/3 rounded-lg' style={{ height: 300 }}>
          <ErrorBoundary
            fallback={<div>Something error</div>}
          >
            <Viewer {...res} id={`res.token_id`} />
          </ErrorBoundary>
        </div>

      </div>
      <br />
      <br />
      <br />
      <CollectionSwipe {...{ collectionName: "ddd-trial.testnet" }} />
      <br />
      <br />
      {/* <CollectionSwipe {...{ collectionName: "ddd-protocol.testnet" }} /> */}
    </Layout>
  )
}

export default Index


