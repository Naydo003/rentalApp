import Head from 'next/head'
// import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { prisma } from '../database/db'
import NavBarSearch from '@/modules/rentee-booking/NavBarSearch';
import SearchResults from '@/modules/item-search/components/SearchResults';


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

        <SearchResults items={items} />

      </main>
    </div>
  )
}

export async function getServerSideProps() {
  console.log("getting ssP's")
  const items = await prisma.item.findMany({
    where: {
      NOT: { active: false }
    },
    select: {
      id: true,
      name: true,
      category: true,
      condition: true,
      itemPhotos: {
        where: { 
          order: 1 
        },
        select: {
          imageUrl: true
        }
      },
      rentPerHour: true,
      rentPerHourPrice: true,
      rentPerDay: true,
      rentPerDayPrice: true,
    },
  })

  return {
    props: {
      items: JSON.parse(JSON.stringify(items))         // this JSON hack is required as the Date Object in mysql cannot be seriealised hence cannot be sent from backend to frontend.
    }
  }
}
