import Asset from '@/components/Asset'
import useCollections from '@/helpers/hooks/useCollections'
import Link from 'next/link'

const CollectionSwipe = ({ collectionName, title = 'Title examples' }) => {

    const { collections: exampleColl } = useCollections(collectionName)

    return (
        <div >
            <Link href={`/profile/${collectionName}`}>
                <div className='text-2xl text-black mb5 cursor-pointer font-bold'>Collections of {collectionName}</div>
            </Link>
            <ul className=' mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
                {!!exampleColl.length && exampleColl.map((item, i) =>
                    <Asset
                        key={i}
                        {...item}
                    />
                )}
            </ul>
        </div>

    )
}

export default CollectionSwipe



