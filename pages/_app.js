import Layout from '@/Components/Layout'
import '@/styles/globals.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
})

export default function App({ Component, pageProps }) {
  return (
    <main className={poppins.className}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </main>
  )
}
