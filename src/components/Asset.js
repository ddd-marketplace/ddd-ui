import React from 'react'
import Link from 'next/link'
import useInfo from '@/helpers/hooks/useInfo'
import { contractMarket, contractMint } from '@/helpers/configContract'

/**
 *
 * @param {*} props
 * @returns
 *
 * creator
 * last prrice/ best offer
 *
 * title
 * currentpricce br last-price?
 *
 * logo network
 *
 * animation: popup
 */

const Asset = (props) => {
  // i think this will load again? load price? or just  include it?

  const { data, loading } = useInfo(contractMarket, 'get_sale', {
    nft_contract_token: `${contractMint}.${props?.token_id}`,
  })

  // const user = useStore((store) => store.user)
  // const type = props.id.split('/')[0] + 's'
  return (
    <li className='relative border rounded-lg'>
      <Link
        className='absolute inset-0 focus:outline-none'
        href={'/assets/' + `${props.owner_id}?` + `token_id=${props.token_id}`}
      >
        <a>
          <div className='relative'>
            <div
              className={
                'block w-full overflow-hidden bg-gray-100 rounded-lg group aspect-w-10 aspect-h-8 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500'
              }
              style={{
                opacity: 0.9,
              }}
            >
              <img
                src={`${props?.metadata?.media}`}
                alt={props?.metadata?.title}
                loading='lazy'
                className='object-cover pointer-events-none group-hover:opacity-75'
              />
            </div>
          </div>

          <p className='flex p-2 text-sm font-medium text-gray-500'>
            {props?.owner_id}
            <br />
            {props?.metadata?.title}
            <br />
            {data && (
              <div className='absolute px-2 text-sm font-medium text-fuchsia-500 right-1 bottom-1'>
                {data?.sale_conditions} Ⓝ
              </div>
            )}
            {!data && props?.owner_id !== props?.metadata?.ori_creator && (
              <div className='absolute px-2 text-sm font-medium text-fuchsia-500 right-1 bottom-1'>
                SOLD OUT
              </div>
            )}
          </p>
        </a>
      </Link>
    </li>
  )
}

export default Asset
