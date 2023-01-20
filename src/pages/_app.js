import '../styles/globals.css'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })       // need to add display: 'swap', for dev at least, not sure about prod

export default function App({ Component, pageProps }) {

  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  )
}
