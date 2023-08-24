
import React, { useContext, useState } from 'react'
import { prisma } from '@/database/db'
import ItemCardListings from '@/modules/manage-listings/components/ItemCardListings'
import database/db from '@/modules/renters-profile/components/NavbarRentersProfile'
import { UserContext } from '@/common/contexts/user-context'
import NavBarRentersProfile from '@/modules/renters-profile/components/NavbarRentersProfile'


function Bookings({items}) {

  console.log('items')
  console.log(items)

  const [ alphabeticalOrder, setAlphabeticalOrder] = useState(false)
  const [ display, setDisplay ] = useState({
    active: true,
    inactive: true,
  })


  let { userRenterId, accountName } = useContext(UserContext)




  return (
    <>
      <NavBarRentersProfile />
      <main>
        <div className='small-container flex-1 overflow-auto'>
          <h1>Listings for {accountName}</h1>


            <div className='h-fit w-full border' >
              <p className='inline-block'>Display:</p>
              <label className='ml-2'>Active
                <input 
                  className='mx-2' 
                  type='checkbox' 
                  onChange={()=>{
                    setDisplay({...display, active: !display.active})}
                  }
                  checked={display.active} 
                />
              </label>
              <label className='ml-2'>Inactive
                <input 
                  className='mx-2' 
                  type='checkbox' 
                  onChange={()=>{
                    setDisplay({...display, inactive: !display.inactive})}
                  }
                  checked={display.inactive} 
                />
              </label>
             

              <div className='flex flex-col space-y-4 h-fit'>
                {items.map((item) => (
                  (display.active && item.active || (display.inactive && !item.active)) &&
                  <ItemCardListings key={item.id} item={item} />
                ))}
              </div>
            </div>
            
        </div>
      </main>
    </>
  )
}

export default Bookings


export async function getServerSideProps(context) {

  let accountId = 2
// change this to auth
  let userRenterId = 5

  // const escortId = JSON.parse(context.params.escortId)
  console.log("getting ssP's")

  // const {query} = context
  // console.log("getting ssP's")
  // console.log(query)

  let sortBy = {createdAt: 'asc'}


  const items = await prisma.item.findMany({
    where: {
      ownersRenterId: userRenterId
    },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      name: true,
      active: true,
      rentPerHour: true,   
      rentPerHourPrice: true,
      rentPerDay: true,
      rentPerDayPrice: true,
      rentPerWeek: true,
      rentPerWeekPrice: true,
    },
    orderBy: sortBy
  })

  return {
    props: {
      items: JSON.parse(JSON.stringify(items))         // this JSON hack is required as the Date Object in mysql cannot be seriealised hence cannot be sent from backend to frontend.
    }
  }
}
