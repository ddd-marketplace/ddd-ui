import useInfo from '@/helpers/hooks/useInfo'
import { Leva } from 'leva'
import { contractMarket, contractMint } from '@/helpers/configContract'
import useWallet from '@/helpers/hooks/useWallet'
import Button from './Button'
import { useState } from 'react'
import Input from '@/components/Form/Input'
import useContract from '@/helpers/hooks/useContract'

const AssetInfo = (asset) => {
  const { currentUser } = useWallet()

  //to get the price -> load from marketplace?
  const { data, loading } = useInfo(contractMarket, 'get_sale', {
    nft_contract_token: `${contractMint}.${asset?.token_id}`,
  })

  return (
    <>
      <div className=' z-10 ' style={{ position: 'absolute', width: 300 }}>
        <Leva
          fill
          titleBar={{
            drag: false,
          }}
        />
      </div>
      <div
        className=''
        style={{
          minHeight: '60vh',
        }}
      >
        <label className='text-2xl font-bold text-gray-700'>
          {asset.metadata?.title}
        </label>
        <p className='pb-10 mb-10 font-medium text-gray-700 text-md'>
          {asset?.metadata?.description}
        </p>
        <br />
        <div className='text-lime-500'>
          CreatedBy: &nbsp;
          <a
            href={`https://explorer.testnet.near.org/accounts/${asset?.metadata?.ori_creator}`}
            className='font-bold text-blue-300'
          >
            {asset?.metadata?.ori_creator}
          </a>
        </div>
        <div className='text-lime-500'>
          Owned By: &nbsp;
          <a
            href={`https://explorer.testnet.near.org/accounts/${asset?.owner_id}`}
            className='font-bold text-blue-300'
          >
            {asset?.owner_id}
          </a>
        </div>
        <br />
        <PriceInfo
          data={data}
          isOwner={asset?.owner_id === currentUser?.accountId}
          {...asset}
        />
        {/* price? */}
        {/* check if not approve in this marketplace -> approve method -> aka sell */}
        {/* if sell update price */}
        {/* not owner -> buy  or "owner do not list"*/}
      </div>
    </>
  )
}

export default AssetInfo

const PriceInfo = ({ data = null, isOwner = false, ...rest }) => {
  if (!data && isOwner) {
    return <InputPrice {...rest} />
  }
  if (!data && !isOwner) {
    return <div>*Owner not list this yet</div>
  }

  if (data && !isOwner) {
    return (
      <div>
        <div className='text-3xl font-bold text-pink-700'>
          {data?.sale_conditions} Ⓝ
        </div>
        <br />
        <br />

        <ButtonBuy {...{ data }} {...rest} />
      </div>
    )
  }
  if (data && isOwner) {
    return (
      <div>
        <div className='text-3xl font-bold text-pink-700'>
          {data?.sale_conditions} Ⓝ
        </div>
        <br />

        <div className='text-sm text-yellow-700'>
          *Currently update price is on construction
        </div>
        <Button
          className={`w-full`}
          disabled={true}
          onClick={() => alert('open modal ')}
        >
          Update price
        </Button>
      </div>
    )
  }
}

const InputPrice = (props) => {
  const [state, setState] = useState(false)
  const { callContract, loading } = useContract(contractMint)
  return (
    <div>
      {!!state && (
        <Input
          key='name'
          label='Input Price: Ⓝ'
          value={state}
          onChange={(x) => setState(x)}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault()
            }
          }}
          type='tel'
          pattern='^-?[0-9]\d*\.?\d*$'
        />
      )}
      <br />
      <Button
        disabled={loading}
        className={`w-full`}
        onClick={() => {
          if (!state) {
            setState(10)
          } else {
            const payload = {
              token_id: props?.token_id,
              account_id: contractMarket,
              msg: JSON.stringify({ sale_conditions: String(state) }),
            }
            // fn to approve
            callContract('nft_approve', payload)
              .then((res) => {
                console.log(res, 'nft_approve', typeof res, res?.Receipts)
                // alert(res)
                // force refresh
              })
              .catch((e) => {
                console.log(e)
                throw Error('Listing to marketplace contract is error')
              })
          }
        }}
      >
        {state ? `Sell it` : `Set Price`}
      </Button>
    </div>
  )
}

const ButtonBuy = (props) => {
  const { callContract, loading } = useContract(contractMarket)
  return (
    <Button
      disabled={loading}
      className={`w-full`}
      onClick={() => {
        const payload = {
          token_id: props?.token_id,
          nft_contract_id: contractMint,
        }
        // fn to approve
        callContract('offer', payload, props?.data?.sale_conditions, 30)
          .then((res) => {
            console.log(res, 'offer', typeof res, res?.Receipts)
            // alert(res)
            // force refresh
          })
          .catch((e) => {
            console.log(e)
            alert(e)
          })
      }}
    >
      Buy it now
    </Button>
  )
}
