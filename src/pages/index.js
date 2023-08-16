import Head from 'next/head'
// import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import NewUser from '../modules/components/NewUser'
import { prisma } from '../database/db'
import NavBarSearch from '@/modules/rentee-booking/NavBarSearch';


// const inter = Inter({ display: 'swap', subsets: ['latin'] })


export default function Home({items}) {           // items comes from getServerSideProps below

  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  return (
    <div >
      <Head>
        <title>Rental App</title>
        <meta name="description" content="blah blah blah" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}`}
          async
          defer
        ></script>

      </Head>
      <header>
        <NavBarSearch />
      </header>
      <main className={styles.main}>

        <div className='w-full max-w-[1400px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {items.map(item => (
            <div className='h-[250px] border-4 border-black' key={item.id}>
              <h3 className='text-2xl'>{item.name}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>

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
