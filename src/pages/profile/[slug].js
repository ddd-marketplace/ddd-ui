import Layout from '@/components/layout/'
import ProfileBar from '@/components/profiles'
import useCollections from '@/helpers/hooks/useCollections'
import Asset from '@/components/Asset'

const Page = ({ query }) => {
  const { collections } = useCollections(query)
  console.log(collections, 'collections')
  return (
    <Layout>
      <main className='block my-10   gap-x-4 gap-y-8'>
        {/* profiles */}
        <ProfileBar {...{ title: query }} />
        <ul className=' mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
          {!!collections.length &&
            collections.map((item, i) => (
              <Asset key={item?.token_id} {...item} />
            ))}
        </ul>
      </main>
    </Layout>
  )
}

export default Page

//get state from url param index and fetch data again
export async function getServerSideProps({ query }) {
  return {
    props: {
      query: query?.slug,
    },
  }
}
