import { useCallback, useState } from 'react'
import Input from '@/components/Form/Input'
import FileDrop from '@/components/Form/FileDrop'
import Button from '../Button'
import useWallet from '@/helpers/hooks/useWallet'
import useContract from '@/helpers/hooks/useContract'

const ipfsAPI = require('ipfs-http-client')
const ipfs = ipfsAPI({
  host: 'ipfs.infura.io',
  port: '5001',
  protocol: 'https',
})

const AddAsset = ({ onClick }) => {
  // useWallet
  // useContract -> to mint
  const { callContract } = useContract('ddd-protocol.testnet')
  const { currentUser } = useWallet()

  const [loading, setLoading] = useState(false)
  const [meta, setMeta] = useState({
    title: null,
    description: null,
  })

  const [thumbnail, setThumbnail] = useState(null)
  const [file3D, setFile3D] = useState(null)

  const handleSubmission = async () => {
    // check required payload full?
    console.log(
      !file3D || !thumbnail || !meta.title || !meta.description,
      'x',
      !file3D,
      file3D,
      !thumbnail,
      thumbnail,
      !meta.title,
      !meta.description,
      meta
    )

    if (!file3D || !thumbnail || !meta.title || !meta.description)
      return alert('Fill the empty field')

    // wallet is ready?
    //  check balance is enough?
    if (!currentUser?.accountId) return alert('Connect to wallet')

    setLoading(true)

    try {
      // 1. load file
      const storedThumbnail = await ipfs.add(thumbnail)
      const stored3D = await ipfs.add(file3D)

      const metaWithFiles = {
        ...meta,
        copies: 1,
        ori_creator: currentUser?.accountId,
        media: `https://ipfs.io/ipfs/${storedThumbnail.path}`,
        model3d_url: `https://ipfs.io/ipfs/${stored3D.path}?filename=${stored3D.path}.glb`,
      }

      const storedMeta = await ipfs.add(JSON.stringify(meta))
      console.log(`success froze media https://ipfs.io/ipfs/${storedMeta.path}`)

      const metaCompleted = {
        ...metaWithFiles,
        ipfs_meta: `https://ipfs.io/ipfs/${storedMeta.path}`,
      }

      // call program
      const payload = {
        token_id: storedMeta.path,
        receiver_id: currentUser?.accountId,
        metadata: metaCompleted,
      }

      callContract('nft_mint', payload)
        .then((res) => {
          console.log(res, 'nft_mint', typeof res, res?.Receipts)
          alert(res)
        })
        .catch((e) => {
          console.log(e)
          throw Error('Minting contract is error')
        })

      setLoading(false)
    } catch (error) {
      console.log(error)
      alert('Something error')
      setLoading(false)
    }
  }

  return (
    <main className='max-w-lg px-4 pt-10 pb-12 mx-auto lg:pb-16'>
      <label className='pb-10 mb-10 text-2xl font-bold text-gray-700'>
        Create New Item
      </label>
      <br />
      <br />
      <div className='space-y-6'>
        <Input
          key='name'
          label='Asset Name'
          value={meta.title}
          onChange={(title) => setMeta({ ...meta, title })}
        />
        <Input
          key='description'
          label='Asset Description'
          value={meta.description}
          onChange={(description) => setMeta({ ...meta, description })}
        />

        <FileDrop
          maxSize={50000000} //50mb
          description='This will be image for the thumbnail, max size 50mb'
          label='Upload your thumbnail'
          onChange={async (x) => {
            const reader = new window.FileReader()
            reader.readAsArrayBuffer(x)
            reader.onloadend = () => {
              // console.log('Buffer data: ', Buffer(reader.result))
              setThumbnail(Buffer(reader.result))
            }
          }}
        />
        <FileDrop
          maxSize={500000000} //500mb
          accept='.glb'
          showPreview={false}
          label='Upload your 3D model. Only GLB file ist accepted'
          onChange={async (x) => {
            const reader = new window.FileReader()
            reader.readAsArrayBuffer(x)
            reader.onloadend = () => {
              console.log('Buffer 3d data: ', Buffer(reader.result))
              setFile3D(Buffer(reader.result))
            }
          }}
        />
        <p className='text-gray-700'>
          Asset storage is frozen, currently on 1 copy only
        </p>
        {/* asset will directly using frozen storage, currently on 1 copy */}
        <div className='flex justify-end'>
          <Button disabled={loading} onClick={handleSubmission}>
            {!loading ? `Mint it` : `Loading...`}
          </Button>
        </div>
      </div>
    </main>
  )
}

export default AddAsset
