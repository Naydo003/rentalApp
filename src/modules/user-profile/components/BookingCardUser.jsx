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
import { statusTitleMap } from '../utils/enumerables';

function pad(n) {
  return n<10 ? '0'+n : n;
}

function BookingCardUser({booking}) {
  const [isExpanded, setIsExpanded ] = useState(false)
  const [ status, setStatus ] = useState(booking.status)
  const [ modalContent, setModalContent ] = useState(null)
  const [ modDetails, setModDetails ] = useState(null)

  const pickUpTime = new Date(booking.pickUpTime)
  let userId = booking.userId                // get from auth
  
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

  const payDeposit = async () => {
    let date = new Date()

    console.log('open modal for payment')
    console.log('add in payment details')
    console.log('Click confirm')
    console.log('create transaction and get payment')

    try {
      const {data} = await axios.post('/api/booking', { newTransactionData })      
      const newTransactionId = data.id
      if (!newTransactionId) {
        console.log("no itemId")
        return
      }
      console.log("newId")
      console.log(newTransactionId)


      // setTransactionId(newTransactionId)

    } catch (err){
      console.log(err)
    }

    let updateData = { 
      status: 'confirmed',
      confirmedAndDepositOnDate: date.toISOString()
    }

    try {
      const result = await axios.patch(`/api/booking`, { 
        updateData, 
        bookingId: booking.id,
        userId: userId          // from context, required so api can match to escortid in db
      })
    console.log("********result******")
    console.log(result)
    setStatus('confirmed')
    console.log('flash message booking accepted')
    } catch (err){
      console.log(err)
    }      
  }

  const retractBooking = async () => {
    let retractedOnDate = new Date()
    let updateData = { 
      status: 'retracted',
      retractedOnDate: retractedOnDate.toISOString()
    }

    try {
      const result = await axios.patch(`/api/booking`, { 
        updateData, 
        bookingId: booking.id,
        // userId: userId          // from context, required so api can match to escortid in db
      })
    console.log("********result******")
    console.log(result)
    setStatus('retracted')
    // router.push(`/escort-profile/${escortId}/bookings`)
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

  const rebook = () => {
    console.log('click')

  }


  const reportOwner = () => {
    console.log('click')
  }

  
console.log('booking.item')
console.log(booking.item)

  
  return (
    <>
      {!!modalContent && (
        <Modal isOpen={!!modalContent} handleClose={() => setModalContent(null)} >
          {modalContent}
        </Modal>
      )}

        <div className={isExpanded ? 'h-80 w-full relative border-b flex' : 'h-40 w-full relative flex'} onClick={() => router.push(`/booking-details/${booking.id}`)}>
          <div className='relative overflow-hidden w-40 h-40 rounded-xl shrink-0'>
            <Image
              src={booking.item?.itemPhotos[0]?.imageUrl || 'https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png'}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 25vw, 10vw"
              alt='item image'
            />
          </div>
          <div className='grow pt-2 mx-5'>
            <div className={status === 'accepted' ? 'border-y-2 border-green-500 text-green-500' : 'border-y-2 border-orange-500 text-orange-500'} >
              <p className='font-semibold text-center'>{statusTitleMap[status]}</p>
            </div>
            <div className='' >
              <h3 className='subheading mb-0 bg-[re]'>{booking.item.name}</h3>
              <p className='bg-[re]'>Pick-up: {pad(pickUpTime.getDate()) + '/' + pad(pickUpTime.getMonth()+1) + '/' + pickUpTime.getFullYear()}</p>
              
              <p className='bg-[rd]'>{pad(pickUpTime.getHours()) + ':' + pad(pickUpTime.getMinutes())}</p>
            </div>
            
            <div className='w-full flex flex-row justify-center space-x-2'>
              
              
              {status === 'accepted' && <button className='small-main-button' type='button' onClick={payDeposit} >Pay Deposit</button>}
              {(status === 'requested' || status === 'accepted') && <button className='small-main-button' type='button' onClick={retractBooking} >Retract</button>}
              {status === 'confirmed' && <button className='small-main-button' type='button' onClick={modOrCancel} >Modify or Cancel</button>}
              {status === 'cancelledByUser' || status === 'cancelledByOwner' &&  <Link className='nav-link hidden sm:block' href={`/${booking.escort.id}/book`} >Re-Book</Link>}
              {(status === 'modRequestedByOwner' || status === 'modRequestOrCancelByOwner') && <button className='small-main-button' type='button' onClick={seeModification} >See Modification Details</button>}
              {(status === 'modRequestedByUser' || status === 'modRequestOrCancelByUser') && <button className='small-main-button' type='button' onClick={seeModification} >See Modification Details</button>}
              {status === 'confirmed' && pickUpTime <= new Date() && <button className='small-main-button' type='button' onClick={reportOwner} >Something Was Wrong with my booking</button>}
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

export default BookingCardUser