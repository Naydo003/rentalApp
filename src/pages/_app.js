import '../styles/globals.css'
import { Inter } from '@next/font/google'
import { ItemProvider } from '../common/contexts/item-context'
import { UserProvider } from '@/common/contexts/user-context'
const inter = Inter({ subsets: ['latin'] })       // need to add display: 'swap', for dev at least, not sure about prod

export default function App({ Component, pageProps }) {

  return (
    <main className={inter.className}>
      <UserProvider>
        <ItemProvider>
          <Component {...pageProps} />
        </ItemProvider>
      </UserProvider>
    </main>
  )
}
