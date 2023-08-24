import { prisma } from '@/database/db'
import React, { useContext, useState } from 'react'
import Image from 'next/image';
import ButtonGeneral from '@/common/ButtonGeneral';
import NavBarManageListings from '@/modules/renters-profile/components/NavbarRentersProfile';
import { useRouter } from 'next/router';
import { ItemContext } from '@/common/contexts/item-context';
import ActivateItemModal from '@/modules/manage-listings/components/ActivateItemModal';
import ChangeConditionModal from '@/modules/manage-listings/components/ChangeConditionModal';
import Modal from '@/common/components/UIElements/Modal';
import ChangePricesModal from '@/modules/manage-listings/components/ChangePricesModal';
import { rentalPeriodsTitleMap, conditionTitleMap, categoriesTitleMap, goofForIndicatorTitleMap, cancellationPolicyChargeTitleMap, cancellationPolicyTimeTitleMap, lateReturnPolicyTitleMap } from '@/common/utilities/enumerables';
import ChangeCancellationPolicyModal from '@/modules/manage-listings/components/ChangeCancellationPolicyModal';
import LateReturnPolicyModal from '@/modules/manage-listings/components/LateReturnPolicyModal';
import ManageItemLinks from '@/modules/manage-listings/components/ManageItemLinks';
import NavBarRentersProfile from '@/modules/renters-profile/components/NavbarRentersProfile';

function ItemDetails({item}) {
  const [ modalContent, setModalContent ] = useState(null)


  const router = useRouter()

  const { setItemId, setItemName } = useContext(ItemContext)

  setItemId(item.id)
  setItemName(item.name)

  const openActivateToggleModal = () => {
    setModalContent(
      <ActivateItemModal setModalContent={setModalContent} active={item.active} />
    )
  }

  const openConditionModal = () => {
    setModalContent(
      <ChangeConditionModal setModalContent={setModalContent} condition={item.condition} />
    )
  }

  const openPricingPlanModal = () => {
    setModalContent(
      <ChangePricesModal setModalContent={setModalContent} item={item} />      // Could reduce this to just price fields
    )
  }

  const openCancellationPolicyModal = () => {
    setModalContent(
      <ChangeCancellationPolicyModal setModalContent={setModalContent} item={item} />      // Could reduce this to just price fields
    )
  }

  const openLatePolicyModal = () => {
    setModalContent(
      <LateReturnPolicyModal setModalContent={setModalContent} lateReturnPolicy={item.LateReturnPolicy} />      // Could reduce this to just price fields
    )
  }


  return (
    <>
      {!!modalContent && (
        <Modal isOpen={!!modalContent} handleClose={() => setModalContent(null)} >
          {modalContent}
        </Modal>
      )}
      <NavBarRentersProfile />
      <main>
        <div className='small-container flex-1 overflow-auto'>
          <ManageItemLinks />
          <div className='border-red-600 border-4 relative'>
          <div className='my-4 flex flex-row justify-between' >
            <p className='inline-block'>Active: {item.active ? 'YES' : 'NO'}</p>
            <div className='w-40 inline-block'>
              <ButtonGeneral onSubmit={openActivateToggleModal}>{item.active ? 'DEACTIVATE' : 'ACTIVATE'}</ButtonGeneral>
            </div>
          </div>
          <hr></hr>
          
          <div className='my-4 relative' >
              <p className=''>Item Details for {item.name}</p>
              <p className=''>Category: {categoriesTitleMap[item.category]}</p>
              <p className=''>Description:</p>
              {item.description.split('\n').map((para, idx) => <p key={idx} className='mb-4'>{para}</p>)}
              <p className=''>Pick Up Address {item.pickUpAddress}</p>
              {item.brand && <p className=''>Brand: {item.brand}</p>}
              {item.model && <p className=''>Model: {item.model}</p>}
              {item.age && <p className=''>Age: {item.age}</p>}
              {item.importantNote && <p className=''>Important Note: {item.importantNote}</p>}
              {item.size && <p className=''>Size: {item.size}</p>}
              {item.goodForIndicator && <p className=''>Good For: {goofForIndicatorTitleMap[item.goodForIndicator]}</p>}
              <div className='flex justify-end' >
                <div className='w-40 inline-block'>
                  <ButtonGeneral onSubmit={()=> router.push(`/manage-listings/${item.id}/edit-details`)}>Edit</ButtonGeneral>
                </div>
              </div>
              
          </div>

          

          <hr></hr>

          <div className='my-4 relative' >
            <p className=''>Condition: {item.condition ? conditionTitleMap[item.condition] : 'None Specified'}</p>
            <div className='flex justify-end' >
              <div className='w-40 inline-block'>
                <ButtonGeneral onSubmit={openConditionModal}>Edit</ButtonGeneral>
              </div>
            </div>
          </div>
          <hr></hr>
          <div className='my-4 relative' >
            <h2>Uploaded Photos</h2>
            <div className='w-full max-w-[1400px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {item.itemPhotos?.map((photo) => (
                <div className='relative h-[150px] border-4 border-black overflow-hidden' key={photo.id} >
                  <Image 
                    src={photo.imageUrl}
                    className="object-cover -z-10"
                    fill
                    alt='escort image'
                  />
                  <p>{photo.id}</p>

                </div>
              ))}
              {!item.itemPhotos && <p>No Photo's to Display</p>}
            </div>
            <div className='flex justify-end mt-4' >
              <div className='w-40 inline-block'>
                <ButtonGeneral onSubmit={openConditionModal}>{item.itemPhotos ? 'Edit' : 'ADD PHOTO'}</ButtonGeneral>
              </div>
            </div>
          </div>
          <hr></hr>
          <div className='my-4' >
            <p className=''>Insured: {item.insured}</p>
            {item.itemNewValue && <p className=''>Item New Value: {item.itemNewValue}</p>}
            <div className='flex justify-end mt-4' >
              <div className='w-40 inline-block'>
                <ButtonGeneral onSubmit={openPricingPlanModal}>{item.insuranced ? 'ADD INSURANCE' : 'CHANGE POLICY'}</ButtonGeneral>
              </div>
            </div>
          </div>
          <hr></hr>
          <div className='my-4' >
            <p className=''>Rent Per Hour Price: {item.rentPerHour ? item.rentPerHourPrice : 'None' }</p>
            <p className=''>Rent Per Day Price: {item.rentPerDay ? item.rentPerDayPrice : 'None'}</p>
            <p className=''>Rent Per Week Price: {item.rentPerWeek ? item.rentPerWeekPrice : 'None'}</p>
            <p className=''>Minimum Rental Period: {item.minimumRentalPeriod ? rentalPeriodsTitleMap[item.minimumRentalPeriod] : 'None'}</p>
            <p className=''>Weekend Rent Per Hour Price: {item.weekendRentPerHour ? item.weekendRentPerHourPrice : 'None'}</p>
            <p className=''>Weekend Rent Per Day Price: {item.weekendRentPerDay ? item.weekendRentPerDayPrice : 'None'}</p>
            <p className=''>Weekend Minimum Rental Period: {item.weekendMinimumRentalPeriod ? rentalPeriodsTitleMap[item.weekendMinimumRentalPeriod] : 'None'}</p>

            <div className='flex justify-end mt-4' >
              <div className='w-40 inline-block'>
                <ButtonGeneral onSubmit={openPricingPlanModal}>Edit</ButtonGeneral>
              </div>
            </div>
          </div>
          <hr></hr>
          <div className='my-4' >
            <p className=''>General Cancellation Policy: {cancellationPolicyChargeTitleMap[item.generalCancellationPolicy]}</p>
            <p className=''>Late Cancellation Policy Time: {cancellationPolicyTimeTitleMap[item.lateCancellationPolicyTime]}</p>
            <p className=''>Late Cancellation Policy Charge: {cancellationPolicyChargeTitleMap[item.lateCancellationPolicyCharge]}</p>
            {item.customCancellationPolicy && <p className=''>Custom Policy: {item.customCancellationPolicy}</p>}
            <div className='flex justify-end mt-4' >
              <div className='w-40 inline-block'>
                <ButtonGeneral onSubmit={openCancellationPolicyModal}>Edit</ButtonGeneral>
              </div>
            </div>
            <p className=''>Late Return Policy: {lateReturnPolicyTitleMap[item.lateReturnPolicy]}</p>
            <div className='flex justify-end mt-4' >
              <div className='w-40 inline-block'>
                <ButtonGeneral onSubmit={openLatePolicyModal}>Edit</ButtonGeneral>
              </div>
            </div>
          </div>
        </div>
        </div>
      </main>
    </>
  )
}

export default ItemDetails

export async function getServerSideProps(context) {


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