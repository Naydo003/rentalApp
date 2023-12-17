import '../styles/globals.css'
import { Inter } from '@next/font/google'
import { ItemProvider } from '../common/contexts/item-context'
import { UserProvider } from '@/common/contexts/user-context'
import { ClerkProvider } from '@clerk/nextjs'
const inter = Inter({ subsets: ['latin'] })       // need to add display: 'swap', for dev at least, not sure about prod

export default function App({ Component, pageProps }) {

  return (
    <main className={inter.className}>
      <ClerkProvider>
        <UserProvider>
          <ItemProvider>
            <Component {...pageProps} />
          </ItemProvider>
        </UserProvider>
      </ClerkProvider>
    </main>
  )
}
