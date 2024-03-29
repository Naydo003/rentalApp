import React, { useContext, useState } from 'react'
import { prisma } from '@/database/db'
import BookingCardUser from '@/modules/user-profile/components/BookingCardUser'
import { useRouter } from 'next/router'
import NavBarSearch from '@/modules/rentee-booking/NavBarSearch'
import UserCalendar from '@/modules/user-profile/components/UserCalendar'

function Bookings({bookings}) {
  const [ calendarView, setCalendarView] = useState(false)
  const [ displayStatus, setDisplayStatus ] = useState({
    accepted: true,
    requested: true,
    declined: true,
    confirmed: true,
    modRequestedByUser: true,
    modRequestOrCancelByUser: true,
    cancelledByUser: true,
    modRequestedByOwner: true,
    modRequestOrCancelByOwner: true,
    cancelledByOwner: true,
    completed: true,
    closed: false,
  })


  const router = useRouter()

  const { userId } = router.query     // will need this to be from auth

  console.log(bookings)


  return (
    <>
      <NavBarSearch />
      <main>
        <div className='small-container flex-1 overflow-auto'>
          <h1 className='heading'>Bookings for {bookings[0]?.renter?.userAccount?.name}</h1>
          <div>

            <button onClick={() => {setCalendarView(!calendarView)}}>{calendarView ? 'List View' : 'Calendar'}</button>
          </div>

          {calendarView ? 
            <UserCalendar /> :
            <div className='h-fit w-full border' >
              <p className='inline-block'>Display:</p>
              <label className='ml-2'>Accepted
                <input 
                  className='mx-2' 
                  type='checkbox' 
                  onChange={()=>{
                    setDisplayStatus({...displayStatus, accepted: !displayStatus.accepted})}
                  }
                  checked={displayStatus.accepted} 
                />
              </label>
              <label className='ml-2'>Confirmed
                <input 
                  className='mx-2' 
                  type='checkbox' 
                  onChange={()=>{
                    setDisplayStatus({...displayStatus, confirmed: !displayStatus.confirmed})}
                  }
                  checked={displayStatus.confirmed} 
                />
              </label>
              <label className='ml-2'>Requested
                <input 
                  className='mx-2' 
                  type='checkbox' 
                  onChange={()=>{
                    setDisplayStatus({...displayStatus, requested: !displayStatus.requested})}
                  }
                  checked={displayStatus.requested} 
                />
              </label>
              <label className='ml-2'>Modification Requested
                <input 
                  className='mx-2' 
                  type='checkbox' 
                  onChange={()=>{
                    setDisplayStatus({...displayStatus, modRequestedByUser: !displayStatus.modRequestedByUser, modRequestOrCancelByUser: !displayStatus.modRequestOrCancelByUser, modRequestedByOwner: !displayStatus.modRequestedByOwner, modRequestOrCancelByOwner: !displayStatus.modRequestOrCancelByOwner})}
                  }
                  checked={displayStatus.modRequestedByUser} 
                />
              </label>
              <label className='ml-2'>Cancelled
                <input 
                  className='mx-2' 
                  type='checkbox' 
                  onChange={()=>{
                    setDisplayStatus({...displayStatus, cancelledByUser: !displayStatus.cancelledByUser, cancelledByOwner: !displayStatus.cancelledByOwner})}
                  }
                  checked={displayStatus.cancelledByUser} 
                />
              </label>
              <label className='ml-2'>Rejected
                <input 
                  className='mx-2' 
                  type='checkbox' 
                  onChange={()=>{
                    setDisplayStatus({...displayStatus, rejected: !displayStatus.rejected, retracted: !displayStatus.retracted})}
                  }
                  checked={displayStatus.rejected} 
                />
              </label>
              <div className='flex flex-col space-y-4 h-fit mt-10'>
                {bookings.map((booking) => (
                  displayStatus[booking.status] === true &&
                  <BookingCardUser key={booking.id} booking={booking} />
                ))}
              </div>
            </div>
            
          }       
        </div>
      </main>
    </>
  )
}

export default Bookings


export async function getServerSideProps(context) {

  const userId = JSON.parse(context.params.userId)
  console.log("getting ssP's")

  // const {query} = context
  // console.log("getting ssP's")
  // console.log(query)

  let sortBy = {pickUpTime: 'asc'}
  let keywordSearch = []

  // if (query.sort) {
  //   query.sort === 'Soonest' && (sortBy[startTime] = 'asc')
  //   // query.sort === 'Price: High to Low' && (sortBy.basePrice = 'desc')
  //   // query.sort === 'Price: Low to High' && (sortBy.basePrice = 'asc')
  //   // query.sort === 'By City' && (sortBy.city = 'desc')
  //   // query.sort === 'Available Now' && (sortBy.availableNow = 'desc')
  // }


  const bookings = await prisma.booking.findMany({
    where: {
      OR: keywordSearch.length && keywordSearch || undefined,
      AND: [ { userId: userId } ],
      NOT: { transactionStatus: "closed" },
    },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      item: {
        select: {
          id: true,
          name: true,
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
          rentPerWeek: true,
          rentPerWeekPrice: true,
          minimumRentalPeriod: true,
          weekendRentPerHour: true,
          weekendRentPerHourPrice: true,
          weekendRentPerDay: true,
          weekendRentPerDayPrice: true,
          weekendMinimumRentalPeriod: true,
        }
      },
      itemId: true,
      // renter: {
      //   select: {
      //     userAccount: {
      //       select: { name: true }
      //     }
      //   }
      // },
      owner: {
        select: {
          userAccount: {
            select: { 
              name: true,
              profilePictureUrl: true 
            }
          }
        }
      },
      itemAgreedRate: true,
      itemAgreedEarlyCancelPolicy: true,
      itemAgreedLateCancelationPolicyTime: true,
      itemAgreedLateCancelationPolicyCharge: true,
      agreedDeposit: true,
      expectedTransactionCost: true,
      customCancellationPolicy: true,
      itemAgreedLateReturnPolicy: true,
      customLateReturnPolicy: true,
      pickUpTime: true,
      returnTime: true,
      renterNote: true,
      renteeNote: true,
      status: true,
    },
    orderBy: sortBy
  })

  return {
    props: {
      bookings: JSON.parse(JSON.stringify(bookings))         // this JSON hack is required as the Date Object in mysql cannot be seriealised hence cannot be sent from backend to frontend.
    }
  }
}