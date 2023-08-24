import { prisma } from '@/database/db'
import React, { useState } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router';
import Modal from '@/common/components/UIElements/Modal';
import { rentalPeriodsTitleMap, conditionTitleMap, categoriesTitleMap, goofForIndicatorTitleMap, cancellationPolicyChargeTitleMap, cancellationPolicyTimeTitleMap, lateReturnPolicyTitleMap } from '@/common/utilities/enumerables';
import NavBarSearch from '@/modules/rentee-booking/NavBarSearch';
import ButtonMain from '@/common/ButtonMain';
import BookingPanel from '@/modules/rentee-booking/BookingPanel';
import { addHoursHelper } from '@/common/utilities/date-functions';

function ItemAd({item}) {
  const [ modalContent, setModalContent ] = useState(null)
  const router = useRouter()



  // const openActivateToggleModal = () => {
  //   setModalContent(
  //     <ActivateItemModal setModalContent={setModalContent} active={item.active} />
  //   )
  // }


  const onSubmit = async (updateData) => {
    console.log("********onsubmit triggered******")

    updateData.category = category

    try {
      const result = await axios.patch('/api/items', { updateData, itemId })
    console.log("********result******")
    console.log(result)

    
    nextRoute ? router.push(nextRoute) : router.push(`/create-a-listing/${itemId}/add-condition`)

    } catch (err){
      console.log(err)
    }                                               // may be able to use single try catch here.
  }

  const times = []
  let t = new Date()
  t.setHours(0,0,0)
  let end = new Date()
  end.setHours(23,45,0)
  console.log(t)
  console.log(end)
  
  for (let i = t; i <= end; i.setMinutes(i.getMinutes() + 15)) {
  
    times.push({
      title: i.toLocaleTimeString(undefined, {
        hour:   '2-digit',
        minute: '2-digit',
      }),
      time: new Date(i)
    })
  }
   console.log(times)
  

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
 
          <h1 className='heading'>{item.name}</h1>
          <p className='secondary-text mt-0 mb-2'>{categoriesTitleMap[item.category]}</p>
          <p className=''>Pick Up Address {item.pickUpAddress}</p>
          <hr></hr>

          <div className='my-4 relative' >
            
            <div className='w-full max-w-[1400px] h-[400px] grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 border-1 border-red-600 rounded-2xl overflow-hidden'>
              {item.itemPhotos?.map((photo) => (
                
                <div className={photo.order === 1 ? 'col-span-2 row-span-2' : ''} >
                  <div className='relative h-full overflow-hidden' key={photo.id} >
                    <Image 
                      src={photo.imageUrl}
                      className="object-cover -z-10"
                      fill
                      alt='item image'
                    />
                    <p>{photo.id}</p>
  
                  </div>
                </div>
                
              ))}
              {!item.itemPhotos.length && 
                <div className='border border-gray-400 col-span-2 text-center flex flex-col justify-center items-center content-center'>
                  <p>
                    No Photo's to Display
                  </p>
                </div>
              }
            </div>

          </div>

          <div className='grid grid-cols-3'>

            <div className='col-span-2'>

            
              <hr></hr>
              <div className='my-4 relative' >
                <p className=''>Condition: {item.condition ? conditionTitleMap[item.condition] : 'None Specified'}</p>
                {item.goodForIndicator && <p className=''>Good For: {goofForIndicatorTitleMap[item.goodForIndicator]}</p>}
              </div>
              <hr></hr>
              
              <div className='my-4 relative' >

              
                <div className='py-4 sm:px-8 md:px-20' >
                  {item.brand && <p className='text-center'>Brand: {item.brand}</p>}
                  {item.model && <p className='text-center'>Model: {item.model}</p>}
                  {item.size && <p className='text-center'>Size: {item.size}</p>}
                  {item.age && <p className='text-center'>Age: {item.age}</p>}
                </div>
                

                <p className=''>Description:</p>
                {item.description.split('\n').map((para) => <p className='mb-4'>{para}</p>)}
                {item.importantNote && <p className='subheading'>Important Note</p>}
                {item.importantNote && <p className='secondary-text'>{item.importantNote}</p>}

              </div>

              <hr></hr>


              <div className='my-4' >
                <h3 className='inline'>Prices: </h3>
                <p className={item.rentPerHour ? 'inline' : 'inline text-gray-400'}>{item.rentPerHour ? ('$' + item.rentPerHourPrice) : '-' }</p>
                <p className={item.rentPerHour ? 'inline' : 'inline text-gray-400'}> per hour / </p>
                
                <p className={item.rentPerDay ? 'inline' : 'inline text-gray-400'}>{item.rentPerDay ? ('$' + item.rentPerDayPrice) : '-'}</p>
                <p className={item.rentPerDay ? 'inline' : 'inline text-gray-400'}> per day / </p>

                <p className={item.rentPerWeek ? 'inline' : 'inline text-gray-400'}>{item.rentPerWeek ? ('$' + item.rentPerWeekPrice) : '-'}</p>
                <p className={item.rentPerWeek ? 'inline' : 'inline text-gray-400'}> per week</p>

                <p className={item.minimumRentalPeriod !== 'none' ? 'inline' : 'inline text-gray-400'}>{' ( ' + (item.minimumRentalPeriod ? (rentalPeriodsTitleMap[item.minimumRentalPeriod] + ' minimum booking )') : 'No Minimum')}</p>
                <br></br>
                <h3 className='inline'>Weekend & Public Holidays: </h3>

                <p className={item.weekendRentPerHour ? 'inline' : 'inline text-gray-400'}>{item.weekendRentPerHour ? ('$' + item.weekendRentPerHourPrice) : '-'}</p>
                <p className={item.weekendRentPerHour ? 'inline' : 'inline text-gray-400'}> per hour / </p>
                <p className={item.weekendRentPerDay ? 'inline' : 'inline text-gray-400'}>{item.weekendRentPerDay ? ('$' + item.weekendRentPerDayPrice) : '-'}</p>
                <p className={item.weekendRentPerDay ? 'inline' : 'inline text-gray-400'}> per day</p>
                <p className={item.weekendMinimumRentalPeriod !== 'none' ? 'inline' : 'inline text-gray-400'}>{' ( ' + (item.weekendMinimumRentalPeriod ? rentalPeriodsTitleMap[item.weekendMinimumRentalPeriod] + ' minimum booking )' : 'None')}</p>

              </div>
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
                <p className=''>{lateReturnPolicyTitleMap[item.lateReturnPolicy]}</p>


              </div>
            </div>
            <div className='border border-mainBlack-100 p-4'>
              <BookingPanel item={item} pickUpDateTime={new Date(2023,8,24,15,30,0)} returnDateTime={new Date(2023,8,25,21,30,0)}/>
            </div>
          </div>
        </div>
        </div>
      </main>
    </>
  )
}

export default ItemAd



export async function getServerSideProps(context) {

  console.log("context.params")
  console.log(context.params)

  const itemId = JSON.parse(context.params.itemId)

  console.log("getting ssP's")
  const item = await prisma.item.findUnique({
    where: {
      id: itemId,
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

