import ButtonMain from '@/common/ButtonMain'
import { cancellationPolicyChargeTitleMap, cancellationPolicyTimeTitleMap, lateReturnPolicyTitleMap } from '@/common/utilities/enumerables'
import BookingPanelDisplayOnly from '@/modules/booking/components/BookingPanelDisplayOnly'
import BookingPanel2 from '@/modules/rentee-booking/BookingPanel2'
import NavBarSearch from '@/modules/rentee-booking/NavBarSearch'
import React from 'react'

function BookingDetails({booking}) {

  const pickUpTime = new Date(booking.pickUpTime)
  const returnTime = new Date(booking.returnTime)
  

  return (
  <>
    {/* {!!modalContent && (
      <Modal isOpen={!!modalContent} handleClose={() => setModalContent(null)} >
        {modalContent}
      </Modal>
    )} */}
    <NavBarSearch />
    <main>
      <div className='xl-container flex-1 overflow-auto'>
        
        <div className='border-red-600 border-4 relative'>

        <h1 className='heading'>Request to Book - {booking.item.name}</h1>


        <div className='grid grid-cols-5'>

          <div className='col-span-3'>

          
            <hr></hr>
            <div className='my-4 relative' >
          
              <p className=''>Pick Up Address {booking.item.pickUpAddress}</p>
              <hr></hr>

            </div>

            <div className='my-4 relative' >
          
              <p className=''>Pick Up Time:</p>
              <p className=''>
                {pickUpTime.toLocaleTimeString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className=''>Drop Off Time:</p>
              <p className=''>
                {returnTime.toLocaleTimeString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
              <hr></hr>

            </div>

            <hr></hr>
            
            <div className='my-4 relative' >


              {booking.item.importantNote && <p className='subheading'>Important Note</p>}
              {booking.item.importantNote && <p className='secondary-text'>{item.importantNote}</p>}

            </div>

            <hr></hr>

            <p className='my-4 relative'>{booking.renteeNote}</p>

            <p className='my-4 relative'>{booking.renterNote}</p>



            <hr></hr>
            <div className='my-4' >
              <h3 className='subheading'>Cancellation Policy</h3>
              {booking.itemAgreedEarlyCancelPolicy === 'customPolicy' ? (
                <>
                  <p className='secondary-text'>This items has a custom cancellation policy which is not managed by xxxx. Please read it carefully</p>
                  <p className='primary-text'>Custom Policy: {booking.customCancellationPolicy}</p>
                </>
              ) : (
                <>
                  <p className='inline primary-text'>General Cancellation Policy: </p>
                  <p className={booking.itemAgreedEarlyCancelPolicy === 'free' ? 'bg-green-300 inline' : (booking.itemAgreedEarlyCancelPolicy === ('percent10' || 'percent25') ? 'bg-orange-300 inline' : 'bg-red-500 inline')}>
                    {cancellationPolicyChargeTitleMap[booking.itemAgreedEarlyCancelPolicy]}
                  </p>
                  <br></br>
                  <p className='inline primary-text'>Late Cancellation Policy: </p>
                  <p className={booking.itemAgreedLateCancelationPolicyCharge === 'free' ? 'bg-green-300 inline' : (booking.itemAgreedLateCancelationPolicyCharge === ('percent10' || 'percent25') ? 'bg-orange-300 inline' : 'bg-red-500 inline')}>
                    {cancellationPolicyChargeTitleMap[booking.itemAgreedLateCancelationPolicyCharge]}
                  </p>
                  <p className='inline'> if within </p>
                  <p className={booking.itemAgreedLateCancelationPolicyTime === 'none' ? 'bg-green-300 inline' : (booking.itemAgreedLateCancelationPolicyTime === 'customPolicy' ? 'bg-red-500 inline' : 'bg-orange-300 inline')}>
                    {cancellationPolicyTimeTitleMap[booking.itemAgreedLateCancelationPolicyTime]}
                  </p>
                  <p className='inline'> of booking.</p>

                </>
              )}
            </div>
            <hr></hr>
            <div className='my-4'>
              
              <h3 className='subheading'>Late Return Policy</h3>
              
              {booking.itemAgreedLateReturnPolicy === 'customPolicy' ? (
                <>
                  <p className='secondary-text'>This items has a custom cancellation policy which is not managed by xxxx. Please read it carefully</p>
                  <p className='primary-text'>Custom Policy: {booking.customLateReturnPolicy}</p>
                </>
              ) : (
                <p className=''>{lateReturnPolicyTitleMap[booking.itemAgreedLateReturnPolicy]}</p>
              )}


            </div>
            <div className='flex flex-row justify-center' >
              <ButtonMain classNames='w-32' type='submit' formId='booking-form' >Book</ButtonMain>
            </div>
            
          </div>
          <div className='col-span-2 border border-mainBlack-100 p-4'>
            <BookingPanelDisplayOnly 
              item={{
                name: booking.item.name,
                category: booking.item.category,
                condition: booking.item.condition,
                itemPhotos: booking.item.itemPhotos,
              }}
              booking={{
                agreedDeposit: booking.agreedDeposit,
                itemAgreedRate: booking.itemAgreedRate,
                expectedTransactionCost: booking.expectedTransactionCost
              }}
              pickUpDateTime={pickUpTime} 
              returnDateTime={returnTime} 
            />
          </div>
        </div>
      </div>
      </div>
    </main>
  </>
  )
}

export default BookingDetails

export async function getServerSideProps(context) {

  const booking = await prisma.booking.findUnique({
    where: {
      id: JSON.parse(context.params.bookingId)
    },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      item: {
        select: {
          name: true,
          pickUpAddress: true,
          importantNote: true,
          itemPhotos: {
            where: {
              order: 1
            },
            select: {
              imageUrl: true
            }
          },
        }
      },
      itemId: true,
      renter: {
        select: {
          userAccount: {
            select: { name: true }
          }
        }
      },
      userId: true,
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
      communication: true,
      status: true,
      acceptedOnDate: true,
      confirmedAndDepositOnDate: true,
      declinedOnDate: true,
      retractedOnDate: true,
      modRequestDetails: true,
      cancellationDetails: true,
      bookingClosedOnDate: true,
      transaction: true,
      transactionStatus: true,

    }
  })

  return {
    props: {
      booking: JSON.parse(JSON.stringify(booking))         // this JSON hack is required as the Date Object in mysql cannot be seriealised hence cannot be sent from backend to frontend.
    }
  }
}