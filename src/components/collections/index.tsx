import Asset from '@/components/Asset'
import useCollections from '@/helpers/hooks/useCollections'

const Collections = ({ collectionName }) => {

    const { collections: exampleColl } = useCollections(collectionName)

    return (

        <ul className=' mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
            {!!exampleColl.length && exampleColl.map((item, i) =>
                <Asset
                    key={item?.token_id}
                    {...item}
                />
            )}
        </ul>
    )
}

export default Collections



