import Head from 'next/head'
// import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import NewUser from '../modules/components/NewUser'
import { prisma } from '../utils/db'
import NavBarSearch from '../modules/components/rentee-booking/NavBarSearch'

// const inter = Inter({ display: 'swap', subsets: ['latin'] })


export default function Home({items}) {           // items comes from getServerSideProps below
  return (
    <div >
      <Head>
        <title>Rental App</title>
        <meta name="description" content="blah blah blah" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

      </Head>
      <header>
        <NavBarSearch />
      </header>
      <main className={styles.main}>

        {items.map(item => (
          <div key={item.id}>
            <h3 className='text-2xl'>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))}

        <NewUser />

      </main>
    </div>
  )
}

export async function getServerSideProps() {
  console.log("getting ssP's")
  const items = await prisma.item.findMany()

  return {
    props: {
      items: JSON.parse(JSON.stringify(items))         // this JSON hack is required as the Date Object in mysql cannot be seriealised hence cannot be sent from backend to frontend.
    }
  }
}
