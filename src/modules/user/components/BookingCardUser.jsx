import { timeframeTitleMap } from '@/common/utilities/enumerables'
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
    if (booking.status === 'modRequestedByUser' || booking.status === 'modRequestOrCancelByUser' || booking.status === 'modRequestedByEscort' || booking.status === 'modRequestOrCancelByEscort') {
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
        userId: userId          // from context, required so api can match to escortid in db
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


  const reportEscort = () => {
    console.log('click')
  }

  

  
  return (
    <>
      {!!modalContent && (
        <Modal isOpen={!!modalContent} handleClose={() => setModalContent(null)} >
          {modalContent}
        </Modal>
      )}

      <div className={isExpanded ? 'h-[400px] w-full border grid grid-cols-4 gap-x-4 relative' : 'h-[400px] w-80 border grid grid-cols-5 gap-x-4 relative'}>
        <p className='bg-[re]'>Item: {booking.item.name}</p>
        <p className='bg-[re]'>Date: {pad(pickUpTime.getDate()) + '/' + pad(pickUpTime.getMonth()+1) + '/' + pickUpTime.getFullYear()}</p>
        
        <p className='bg-[rd]'>Time: {pad(pickUpTime.getHours()) + ':' + pad(pickUpTime.getMinutes())}</p>

        <div className='bg-[rd]'>
          
          {/* <p>For: {timeframeTitleMap[booking.duration]}</p> */}
        </div>
        <div className='bg-[rd]'>
          <div className={'h-8 w-24 ' + (status === 'accepted' ? 'bg-green-300' : 'bg-orange-300')} >
            <p>{status}</p>
          </div>
          
          {status === 'accepted' && <button type='button' onClick={payDeposit} >Pay Deposit</button>}
          {status === 'requested' || status === 'accepted' && <button type='button' onClick={retractBooking} >Decline</button>}
          {status === 'confirmed' && <button type='button' onClick={modOrCancel} >Modify or Cancel</button>}
          {status === 'cancelledByUser' || status === 'cancelledByEscort' &&  <Link className='nav-link hidden sm:block' href={`/${booking.escort.id}/book`} >Re-Book</Link>}
          {(status === 'modRequestedByEscort' || status === 'modRequestOrCancelByEscort') && <button type='button' onClick={seeModification} >See Modification Details</button>}
          {(status === 'modRequestedByUser' || status === 'modRequestOrCancelByUser') && <button type='button' onClick={seeModification} >See Modification Details</button>}
          {status === 'confirmed' && pickUpTime <= new Date() && <button type='button' onClick={reportEscort} >Something Was Wrong with my booking</button>}
        </div>
        <p className=''>Message: {booking.renterNote}</p>
        {modDetails && <p className='bg-[red]' >Booking Mod Id: {modDetails?.id}</p>}

        <div className='absolute bottom-0 w-full h-[20px] hover:bg-gray-300 text-center' onClick={expandBookingHandler}>
          {isExpanded ? 'See less...' : 'See more...'}
        </div>
      </div>
    </>
  )
  
}

export default BookingCardUser