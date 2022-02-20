import Layout from '@/components/layout/'
import AddAsset from '@/components/AddAsset/'
import Head from 'next/head'

const Page = () => {
  return (
    <Layout title={'Add your own asset'} center>
      <AddAsset />
    </Layout>
  )
}

export default Page
