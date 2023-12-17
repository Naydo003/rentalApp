import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
// import { toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

import { useRouter } from 'next/router';
import Modal from '@/common/components/UIElements/Modal';
import ModifyBooking from '../../booking/components/ModifyBooking';
import CancelBooking from '../../booking/components/CancelBooking';
import SeeModChanges from '@/modules/booking/components/SeeModChanges';
import Link from 'next/link';
import Image from 'next/image';
import { statusTitleMapOwner } from '../utils/enumerables';



function BookingCardOwner({booking}) {

  console.log(booking)

  const [isExpanded, setIsExpanded ] = useState(false)
  const [ status, setStatus ] = useState(booking.status)
  const [ modalContent, setModalContent ] = useState(null)
  const [ modDetails, setModDetails ] = useState(null)

  const pickUpTime = new Date(booking.pickUpTime)
  const returnTime = new Date(booking.returnTime)

  
  const expandBookingHandler = () => {
    setIsExpanded(!isExpanded)
  }

  const router = useRouter()

  useEffect(()=>{
    if (booking.status === 'modRequestedByUser' || booking.status === 'modRequestOrCancelByUser' || booking.status === 'modRequestedByOwner' || booking.status === 'modRequestOrCancelByOwner') {
      console.log('use Effect to get mod deets running')
      const fetch = async () => {
        try {
          const { data } = await axios.get('/api/booking/modify', { params: {bookingId: booking.id }})      
          const bookingModDetails = data[0]    // do data: bookingModDetails in {}

          if (!bookingModDetails) {
            console.log("no modDeets")
            return
          }
          console.log("booking mod deets")
          console.log(bookingModDetails)
    
          setModDetails(bookingModDetails)
    
        } catch (err){
          console.log(err)
        }
      }
      fetch()
    }
  }, [booking.id, booking.status])

  const acceptBooking = async () => {
    let acceptedOnDate = new Date()
    let updateData = { 
      status: 'accepted',
      acceptedOnDate: acceptedOnDate.toISOString()
    }

    try {
      const result = await axios.patch(`/api/booking`, { 
        updateData, 
        bookingId: booking.id,
      })
    console.log("********result******")
    console.log(result)
    setStatus('accepted')
    console.log('flash message booking accepted')
    } catch (err){
      console.log(err)
    }      
  }

  const declineBooking = async () => {
    console.log('declineing')
    let declinedOnDate = new Date()
    let updateData = { 
      status: 'declined',
      declinedOnDate: declinedOnDate.toISOString()
    }

    try {
      const result = await axios.patch(`/api/booking`, { 
        updateData, 
        bookingId: booking.id,
      })
    console.log("********result******")
    console.log(result)
    setStatus('declined')

    } catch (err){
      console.log(err)
    }          
  }

  const modOrCancel = async () => {

    // opens modal
    setModalContent(
      <>
        <h6>What would you like to do with this booking?</h6>
        <button 
          type='button' 
          onClick={()=>{
            setModalContent(
              <ModifyBooking booking={booking} setStatus={setStatus} setModalContent={setModalContent} setModDetails={setModDetails} />
            )
          }} 
        >
          Modify
        </button>
        <button 
          type='button' 
          onClick={()=>{
            setModalContent(
              <CancelBooking booking={booking} setStatus={setStatus} setModalContent={setModalContent} />
            )
          }} 
        >
          Cancel
        </button>
      </>
    )        
  }


  const seeModification = () => {
    setModalContent(
      <SeeModChanges booking={booking} modDetails={modDetails} setStatus={setStatus} setModalContent={setModalContent} setModDetails={setModDetails} />
    )
  }
  
  const commenceMeeting = () => {
      router.push(
        {
          pathname: `/escort-profile/${escortId}/active-booking`,
          query: { bookingId: booking.id },
      })
  }
  

  const reportUser = () => {
    console.log('make a report')
  }

  
  return (
    <>
      {!!modalContent && (
        <Modal isOpen={!!modalContent} handleClose={() => setModalContent(null)} >
          {modalContent}
        </Modal>
      )}

        <div className={isExpanded ? 'h-80 w-full relative border-b flex' : 'h-40 w-full relative flex'}>
          <div className='relative w-40 h-40' >
            <div className='relative overflow-hidden w-20 h-20 rounded-xl shrink-0'>
              <Image
                src={booking.item?.itemPhotos[0]?.imageUrl || 'https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png'}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 25vw, 10vw"
                alt='item image'
              />
            </div>
            <div className='absolute bottom-0 right-0 w-32 h-32' >
              <div className='relative w-full h-full rounded-full overflow-hidden border' >
                <Image
                  src={booking.renter.userAccount.profilePictureUrl || 'https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png'}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 25vw, 10vw"
                  alt='item image'
                /> 
              </div>
                <div className='absolute -top-4 flex flex-row justify-center items-center w-full' >
                  <div className='bg-yellow-400/40 px-2' >
                    <p className='text-2xl'>{booking.renter.rating}</p>
                  </div>
                </div>
            </div>
            
            
          </div>
          
          <div className='grow pt-2 mx-5'>
            <div className={status === 'accepted' ? 'border-y-2 border-green-500 text-green-500' : 'border-y-2 border-orange-500 text-orange-500'} >
              <p className='font-semibold text-center'>{statusTitleMapOwner[status]}</p>
            </div>
            <div className='' >
              <h3 className='subheading mb-0 bg-[re]'>{booking.renter.userAccount.name} <span className='secondary-text'>for</span> {booking.item.name}</h3>
              <p className='bg-[re]'>Pick-up: {pickUpTime.toLocaleTimeString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
              <p className='bg-[re]'>Returning: {returnTime.toLocaleTimeString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
              
            </div>
            
            <div className='w-full flex flex-row justify-center space-x-2'>
              
              {status === 'requested' && <button className='small-main-button' type='button' onClick={acceptBooking} >Accept</button>}
              {status === 'requested' && <button className='small-main-button' type='button' onClick={declineBooking} >Decline</button>}
              {status === 'declined' && <button className='small-main-button' type='button' onClick={acceptBooking} >Accept</button>}
              {status === 'accepted' && <button className='small-main-button' type='button' onClick={declineBooking} >Decline</button>}
              {status === 'confirmed' && <button className='small-main-button' type='button' onClick={modOrCancel} >Modify or Cancel</button>}
              {(status === 'cancelledByUser' || status === 'cancelledByEscort') && <button className='small-main-button' type='button' onClick={reportUser} >Report User</button>}
              {(status === 'modRequestedByOwner' || status === 'modRequestOrCancelByOwner') && <button className='small-main-button' type='button' onClick={seeModification} >See Modification Details</button>}
              {(status === 'modRequestedByUser' || status === 'modRequestOrCancelByUser') && <button className='small-main-button' type='button' onClick={seeModification} >See Modification Details</button>}
              {status === 'confirmed' && <button className='small-main-button' type='button' onClick={commenceMeeting} >Commence Meeting</button>}

            </div>
    

            {isExpanded && <p className=''>Message: {booking.renterNote}</p>}
            {modDetails && <p className='bg-[red]' >Booking Mod Id: {modDetails?.id}</p>}
    
            {/* <div className='absolute bottom-0 w-full h-[20px] hover:bg-gray-300 text-center' onClick={expandBookingHandler}>
              {isExpanded ? 'See less...' : 'See more...'}
            </div> */}
          </div>
        </div>
        
    </>
  )
  
}

export default BookingCardOwner