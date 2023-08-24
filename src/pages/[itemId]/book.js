import { cancellationPolicyChargeTitleMap, cancellationPolicyTimeTitleMap, conditionTitleMap, lateReturnPolicyTitleMap, rentalPeriodsTitleMap } from '@/common/utilities/enumerables'
import BookingPanel2 from '@/modules/rentee-booking/BookingPanel2'
import NavBarSearch from '@/modules/rentee-booking/NavBarSearch'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { prisma } from '@/database/db'
import ButtonMain from '@/common/ButtonMain'
import { UserContext } from '@/common/contexts/user-context'


function book({item}) {
  const { userRenteeId } = useContext(UserContext)
  const router = useRouter()
  const [ pickUpDateTime, setPickUpDateTime ] = useState(new Date(router.query.pickUpDateTime))
  const [ returnDateTime, setReturnDateTime ] = useState(new Date(router.query.returnDateTime))
  const [ modalContent, setModalContent ] = useState(null)
  const [ agreedPrice, setAgreedPrice ] = useState()
  const [ agreedRate, setAgreedRate ] = useState()

  
  const [ startDate, setStartDate ] = useState(new Date(router.query.pickUpDateTime))
  const [ endDate, setEndDate ] = useState(new Date(router.query.returnDateTime))
  
  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      pickUpTime: pickUpDateTime.toLocaleTimeString(undefined, {
        hour:   '2-digit',
        minute: '2-digit',
      }),
      returnTime: returnDateTime.toLocaleTimeString(undefined, {
        hour:   '2-digit',
        minute: '2-digit',
      })
    }
  })

  const prices = {
    rentPerHour: item.rentPerHour, 
    rentPerHourPrice: item.rentPerHourPrice, 
    rentPerDay: item.rentPerDay, 
    rentPerDayPrice: item.rentPerDayPrice, 
    rentPerWeek: item.rentPerWeek, 
    rentPerWeekPrice: item.rentPerWeekPrice, 
    minimumRentalPeriod: item.minimumRentalPeriod, 
    weekendRentPerHour: item.weekendRentPerHour, 
    weekendRentPerHourPrice: item.weekendRentPerHourPrice, 
    weekendRentPerDay: item.weekendRentPerDay, 
    weekendRentPerDayPrice: item.weekendRentPerDayPrice, 
    weekendMinimumRentalPeriod: item.weekendMinimumRentalPeriod, 
  }
  
  const onSubmit = async (bookingData) => {
    console.log("********onsubmit triggered******")

    bookingData.itemAgreedRate = agreedRate,
    bookingData.itemAgreedEarlyCancelPolicy = item.generalCancellationPolicy,
    bookingData.itemAgreedLateCancelationPolicyTime = item.lateCancellationPolicyTime,
    bookingData.itemAgreedLateCancelationPolicyCharge = item.lateCancellationPolicyCharge,
    bookingData.agreedDeposit = item.deposit,
    bookingData.expectedTransactionCost = agreedPrice,
    bookingData.customCancellationPolicy = item.customCancellationPolicy,
    bookingData.itemAgreedLateReturnPolicy = item.lateReturnPolicy,
    bookingData.customLateReturnPolicy = item.customLateReturnPolicy,
    bookingData.pickUpTime = startDate,
    bookingData.returnTime = endDate,
    bookingData.renterNote = item.importantNote,
    bookingData.status = 'requested'

    console.log(bookingData)



    try {
      const result = await axios.post('/api/booking', { bookingData, itemId: item.id, userRenteeId: userRenteeId })
      console.log("********result******")
      console.log(result)

      
      router.push(`/user/${userRenteeId}/bookings`)

    } catch (err){
      console.log(err)
    }                                               // may be able to use single try catch here.
  }

  return (
    <>
    {!!modalContent && (
      <Modal isOpen={!!modalContent} handleClose={() => setModalContent(null)} >
        {modalContent}
      </Modal>
    )}
    <NavBarSearch />
    <main>
      <div className='xl-container flex-1 overflow-auto'>
        
        <div className='border-red-600 border-4 relative'>

        <h1 className='heading'>Request to Book - {item.name}</h1>


        <div className='grid grid-cols-5'>

          <div className='col-span-3'>

          
            <hr></hr>
            <div className='my-4 relative' >
          
              <p className=''>Pick Up Address {item.pickUpAddress}</p>
              <hr></hr>

            </div>

            <div className='my-4 relative' >
          
              <p className=''>Pick Up Time:</p>
              <p className=''>
                {startDate.toLocaleTimeString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className=''>Drop Off Time:</p>
              <p className=''>
                {endDate.toLocaleTimeString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
              <hr></hr>

            </div>

            <hr></hr>
            
            <div className='my-4 relative' >


              {item.importantNote && <p className='subheading'>Important Note</p>}
              {item.importantNote && <p className='secondary-text'>{item.importantNote}</p>}

            </div>

            <hr></hr>

            <form id='booking-form' className='my-4 relative' onSubmit={handleSubmit(onSubmit)}>


              <label className='form-label' htmlFor='renteeNote'>Note to the owner?</label>
                <textarea id='renteeNote' className='form-input' rows='5' cols='20' {...register('renteeNote')} placeholder='Type your message here'/>
              

            </form>



            <hr></hr>
            <div className='my-4' >
              <h3 className='subheading'>Cancellation Policy</h3>
              {item.generalCancellationPolicy === 'customPolicy' ? (
                <>
                  <p className='secondary-text'>This items has a custom cancellation policy which is not managed by xxxx. Please read it carefully</p>
                  <p className='primary-text'>Custom Policy: {item.customCancellationPolicy}</p>
                </>
              ) : (
                <>
                  <p className='inline primary-text'>General Cancellation Policy: </p>
                  <p className={item.generalCancellationPolicy === 'free' ? 'bg-green-300 inline' : (item.generalCancellationPolicy === ('percent10' || 'percent25') ? 'bg-orange-300 inline' : 'bg-red-500 inline')}>
                    {cancellationPolicyChargeTitleMap[item.generalCancellationPolicy]}
                  </p>
                  <br></br>
                  <p className='inline primary-text'>Late Cancellation Policy: </p>
                  <p className={item.lateCancellationPolicyCharge === 'free' ? 'bg-green-300 inline' : (item.lateCancellationPolicyCharge === ('percent10' || 'percent25') ? 'bg-orange-300 inline' : 'bg-red-500 inline')}>
                    {cancellationPolicyChargeTitleMap[item.lateCancellationPolicyCharge]}
                  </p>
                  <p className='inline'> if within </p>
                  <p className={item.lateCancellationPolicyTime === 'none' ? 'bg-green-300 inline' : (item.lateCancellationPolicyTime === 'customPolicy' ? 'bg-red-500 inline' : 'bg-orange-300 inline')}>
                    {cancellationPolicyTimeTitleMap[item.lateCancellationPolicyTime]}
                  </p>
                  <p className='inline'> of booking.</p>

                </>
              )}
            </div>
            <hr></hr>
            <div className='my-4'>
              
              <h3 className='subheading'>Late Return Policy</h3>
              
              {item.lateReturnPolicy === 'customPolicy' ? (
                <>
                  <p className='secondary-text'>This items has a custom late return policy which is not managed by xxxx. Please read it carefully</p>
                  <p className='primary-text'>Custom Policy: {item.customLateReturnPolicy}</p>
                </>
              ) : (
                <p className=''>{lateReturnPolicyTitleMap[item.lateReturnPolicy]}</p>
              )}


            </div>
            <div className='flex flex-row justify-center' >
              <ButtonMain classNames='w-32' type='submit' formId='booking-form' >Book</ButtonMain>
            </div>
            
          </div>
          <div className='col-span-2 border border-mainBlack-100 p-4'>
            <BookingPanel2 
              item={{
                name: item.name,
                category: item.category,
                condition: item.condition,
                itemPhotos: item.itemPhotos,
              }} 
              prices={prices}
              pickUpDateTime={pickUpDateTime} 
              returnDateTime={returnDateTime} 
              setAgreedRate={setAgreedRate} 
              setAgreedPrice={setAgreedPrice} 
            />
          </div>
        </div>
      </div>
      </div>
    </main>
  </>
  )
}

export default book

export async function getServerSideProps(context) {

  console.log("context.params")
  console.log(context.params)

  // console.log(context.query)

  

  console.log("getting ssP's")
  const item = await prisma.item.findUnique({
    where: {
      id: JSON.parse(context.params.itemId),
    },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      name: true,
      pickUpAddress: true,
      locationCoordinates: true,
      category: true,
      description: true,
      brand: true,
      model: true,
      age: true,
      importantNote: true,
      size: true,
      goodForIndicator: true,
      specialItem: true,
      carMake: true,
      yearOfManufacture: true,
      odometer: true,
      clothingLabel: true,
      bookAuthor: true,
      bookGenre: true,
      condition: true,
      itemPhotos: true,
      owner: true,
      ownersRenterId: true,
      active: true,
      itemNewValue: true,
      deposit: true,
      rentPerHour: true,
      rentPerHourPrice: true,
      rentPerDay: true,
      rentPerDayPrice: true,
      rentPerWeek: true,
      rentPerWeekPrice: true,
      weekendRentPerHour: true,
      weekendRentPerHourPrice: true,
      weekendRentPerDay: true,
      weekendRentPerDayPrice: true,
      minimumRentalPeriod: true,
      weekendMinimumRentalPeriod: true,
      generalCancellationPolicy: true,
      lateCancellationPolicyTime: true,
      lateCancellationPolicyCharge: true,
      customCancellationPolicy: true,
      lateReturnPolicy: true,
      reviews: true,
      bookings: true,
      insuranced: true,
      hasClaims: true,
    }
  })




  return {
    props: {
      item: JSON.parse(JSON.stringify(item))         // this JSON hack is required as the Date Object in mysql cannot be seriealised hence cannot be sent from backend to frontend.
    }
  }
}