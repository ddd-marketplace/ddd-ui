import '@/styles/index.css'
import 'tippy.js/dist/tippy.css' // optional
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import ProgressBar from '@badrap/bar-of-progress'
import { Toaster } from 'react-hot-toast'
import useStore from '@/helpers/store'
// import NearProvider from '@/helpers//NearProvider'

function getInitialColorMode() {
  const persistedColorPreference = window.localStorage.getItem('nightwind-mode')
  const hasPersistedPreference = typeof persistedColorPreference === 'string'
  if (hasPersistedPreference) {
    return persistedColorPreference
  }
  return 'light'
}

const progress = new ProgressBar({
  size: 3,
  color: '#2e298b',
  delay: 100,
  className: 'progress',
})

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart', progress.start)
    router.events.on('routeChangeComplete', progress.finish)
    router.events.on('routeChangeError', progress.finish)
  }, [router.events])

  useEffect(() => {
    getInitialColorMode() === 'light'
      ? document.documentElement.classList.remove('dark')
      : document.documentElement.classList.add('dark')
    document.documentElement.classList.add('nightwind')
    useStore.setState({ darkMode: getInitialColorMode() === 'dark' })
  }, [])

  return (
    <>
      <Head>
        <meta name='googlebot' content='follow, index, noarchive' />
        <meta name='robots' content='follow, index, noarchive' />
        <meta name='viewport' content='initial-scale=1,width=device-width' />

        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />

        <link rel='manifest' href='/site.webmanifest' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='#000000' />
        <meta name='apple-mobile-web-app-title' content='DDD Market' />
        <meta name='application-name' content='DDD Market' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='msapplication-config' content='/browserconfig.xml' />
        <meta name='msapplication-navbutton-color' content='#000000' />
        <meta name='msapplication-tilecolor' content='#000000' />
        <meta name='msapplication-tooltip' content='DDD Market' />
        <meta name='title' content='DDD market' />
        <meta
          name='description'
          content="NFT Marketplace for 3D model"
        />

        <meta property='og:type' content='website' />
        <meta property='og:url' content='http://github.com/ddd-marketplace/' />
        <meta property='og:title' content='ddd market' />
        <meta
          property='og:description'
          content="DDD Marketplace for 3D model"
        />


      </Head>
      {/* <NearProvider> */}
      <Component {...pageProps} />
      {/* </NearProvider> */}
      <Toaster />
    </>
  )
}
export default MyApp
