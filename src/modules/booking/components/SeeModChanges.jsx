
// need to get names from auth

import { timeframeTitleMap } from '@/common/utilities/enumerables';
import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { removeEmptyValues } from '../utils/booking-utility-functions';

function pad(n) {
  return n<10 ? '0'+n : n;
}

function SeeModChanges({booking, modDetails, setStatus, setModalContent, setModDetails }) {


  console.log('modDetails')
  console.log(modDetails)

  let startTimeComment

  if(modDetails.pickUpTime){
    const bookingStartDate = new Date(booking.pickUpTime)   
    const bookingStartDateString = pad(bookingStartDate.getDate()) + '/' + pad(bookingStartDate.getMonth()+1) + '/' + bookingStartDate.getFullYear()
    const bookingStartTimeString = pad(bookingStartDate.getHours()) + ':' + pad(bookingStartDate.getMinutes())
    const modStartDate = new Date(modDetails.pickUpTime)
    const modStartDateString = pad(modStartDate.getDate()) + '/' + pad(modStartDate.getMonth()+1) + '/' + modStartDate.getFullYear()
    const modStartTimeString = pad(modStartDate.getHours()) + ':' + pad(modStartDate.getMinutes())

    if (bookingStartDateString !== modStartDateString){

      startTimeComment = 
        <p className='' >Pick Up date changed from {bookingStartDateString} at {bookingStartTimeString} to {modStartDateString} at {modStartTimeString}</p>
    } else if (bookingStartTimeString !== modStartTimeString){
      startTimeComment = 
        <p className='' >Starting time changed from {bookingStartTimeString} to {modStartTimeString}</p>
    }
  }

  let endTimeComment

  if(modDetails.returnTime){
    const bookingEndDate = new Date(booking.returnTime)   
    const bookingEndDateString = pad(bookingEndDate.getDate()) + '/' + pad(bookingEndDate.getMonth()+1) + '/' + bookingEndDate.getFullYear()
    const bookingEndTimeString = pad(bookingEndDate.getHours()) + ':' + pad(bookingEndDate.getMinutes())
    const modEndDate = new Date(modDetails.returnTime)
    const modEndDateString = pad(modEndDate.getDate()) + '/' + pad(modEndDate.getMonth()+1) + '/' + modEndDate.getFullYear()
    const modEndTimeString = pad(modEndDate.getHours()) + ':' + pad(modEndDate.getMinutes())


    if (bookingEndDateString !== modEndDateString){
    endTimeComment = 
        <p className='' >The expected return date will change from {bookingEndDateString} at {bookingEndTimeString} to {modEndDateString} at {modEndTimeString}</p>
    } else if (bookingEndTimeString !== modEndTimeString){
    endTimeComment = 
        <p className='' >The expected return time will change from {bookingEndTimeString} to {modEndTimeString}</p>
    }
  }


  // const durationComment = 
  //   booking.duration === modDetails.duration ?
  //     <p>The duration will still be {modDetails.duration}</p> :
  //     <p>The duration of the booking will change from {timeframeTitleMap[booking.duration]} to {timeframeTitleMap[modDetails.duration]}</p>

  // need to change .name etc to authed person
  const introComment = 
  ((booking.renter?.name && modDetails.initiatedByRenter) || (booking.item?.name && !modDetails.initiatedByRenter)) ?
    <p>You have requested to make the following changes to the booking with {booking.item?.name || booking.renter?.name}.</p> :
    <p>{booking.item?.name || booking.renter?.name} would like to make the following changes to the booking.</p>
        
  const declineModRequest = async () => {

    // need to append escort note 'your mod request was declined'
    let modifiedBookingData
    if (modDetails.cancelIfReject) {
      console.log("cancel true")
      modifiedBookingData = { status: modDetails.initiatedByRenter ? 'cancelledByOwner' : 'cancelledByUser' }
    } else {
      modifiedBookingData = { 
        status: 'confirmed' 
      }     
    }

    let modificationDetailsData = { status: 'rejected'}


    try {
      const response = await axios.patch('/api/booking/modify', {
        bookingUpdateData: modifiedBookingData,
        modDetailsData: modificationDetailsData,
        bookingId: booking.id,
        modDetailsId: modDetails.id
      })

      toast.success(`You just declined the booking modification request by ${booking.escort?.name || booking.user?.name}`, {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setStatus(modifiedBookingData.status)
      setModDetails(null)
      setModalContent(null)
  
    } catch (err){
      console.log('catch err')
      console.log(err)

      toast.error(`The booking modification request with ${booking.escort?.name || booking.user?.name} could not be declined right now because of a server error, please try again later`, {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }                                       
  }

  const acceptModRequest = async () => {

    // need to append escort note 'your mod request was accepted'
    let modifiedBookingData = {
      itemAgreedRate: modDetails.itemAgreedRate,
      agreedDeposit: modDetails.agreedDeposit,
      expectedtransactionCost: modDetails.expectedtransactionCost,
      startTime: modDetails.startTime,
      endTime: modDetails.endTime,
      duration: modDetails.duration,
      incall: modDetails.incall,     
      location: modDetails.location,
      escortNote: modDetails.escortNote,
      userNote: modDetails.userNote,
      status: 'confirmed'
    }

    modifiedBookingData = removeEmptyValues(modifiedBookingData)

    console.log('modifiedBookingData')
    console.log(modifiedBookingData)

    let modificationDetailsData = {
      itemAgreedRate: modDetails.itemAgreedRate ? booking.itemAgreedRate : null,
      agreedDeposit: modDetails.agreedDeposit ? booking.agreedDeposit : null,
      expectedtransactionCost: modDetails.expectedtransactionCost ? booking.expectedtransactionCost : null,
      startTime: modDetails.startTime ? booking.startTime : null,
      endTime: modDetails.endTime ? booking.endTime : null,
      duration: modDetails.duration ? booking.duration : null,
      incall: modDetails.incall ? booking.incall : null,     
      location: modDetails.location ? booking.location : null,
      escortNote: modDetails.escortNote ? booking.escortNote : null,
      userNote: modDetails.userNote ? booking.userNote : null,
      status: 'approved'
    }

    console.log('modificationDetailsData')
    console.log(modificationDetailsData)
   


    try {
      const response = await axios.patch('/api/booking/modify', {
        bookingUpdateData: modifiedBookingData,
        modDetailsData: modificationDetailsData,
        bookingId: booking.id,
        modDetailsId: modDetails.id
      })

      console.log(response)

      // if (!data.id) {
      //   console.log("no Id")
      //   throw new Error('no cancellation document Id in response')
      // }

      toast.success(`You just accepted the booking modification requested by ${booking.escort?.name || booking.user?.name}`, {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setStatus(`confirmed`)
      setModDetails(null)
      setModalContent(null)

    } catch (err){
      console.log(err)
      toast.error(`The booking modification request with ${booking.escort?.name || booking.user?.name} could not be accepted right now because of a server error, please try again later`, {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }                                       

  }

  const recallModRequest = async () => {

    try {
      const response = await axios.delete('/api/booking/modify', { data: {
        bookingUpdateData: { status: 'confirmed'},
        modData: { status: 'retracted' },
        // escortId: escort.id, 
        // userId: userIdTemp
        bookingId: booking.id,
        modDetailsId: modDetails.id
      }})

      console.log(response)

      // if (!data.id) {
      //   console.log("no Id")
      //   throw new Error('no cancellation document Id in response')
      // }

      toast.success(`You just recalled your booking modification request with ${booking.escort?.name || booking.user?.name}`, {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setStatus(`confirmed`)
      setModDetails(null)
      setModalContent(null)
  
    } catch (err){
      console.log('catch err')
      console.log(err)

      toast.error(`Your booking modification request with ${booking.escort?.name || booking.user?.name} could not be recalled because of a server error, please try again later`, {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }                                       

  }



  return (
    <div className=''>
      
      {introComment}

      {modDetails.itemAgreedRate && (
        <p className='' >Item Agreed Rate from {booking.itemAgreedRate } to {modDetails.itemAgreedRate} </p>
      )}
      {modDetails.agreedDeposit && (
        <p className='' >Agreed Deposit from {booking.agreedDeposit } to {modDetails.agreedDeposit} </p>
      )}
      {modDetails.expectedtransactionCost && (
        <p className='' >Expected Transaction Cost from {booking.expectedtransactionCost } to {modDetails.expectedtransactionCost} </p>
      )}

      {modDetails.pickUpTime && startTimeComment}
      {modDetails.returnTime && endTimeComment}
      {/* {modDetails.duration && durationComment} */}


      {modDetails.renterNote && (
        <p className='' >{modDetails.escortNote}</p>
      )}
      {modDetails.renteeNote && (
        <p className='' >{modDetails.userNote} </p>
      )}



      {((booking.renter?.name && modDetails.initiatedByRenter) || (booking.item?.name && !modDetails.initiatedByRenter)) ? (
        <>
          <p>Cancel the booking if rejected: {modDetails.cancelIfReject ? 'Yes' : 'No'}</p> 
          <button type='button' onClick={recallModRequest} >Recall</button> 
        </>  
        ) : (
        <>
          {modDetails.cancelIfReject ?
            <p>{booking.item?.name || booking.renter?.name} will have to cancel the booking if these changes cannot be accepted.</p> :
            <p>If you decline, your original booking with {booking.item?.name || booking.renter?.name} will still be going ahead.</p>
          }
          <button type='button' onClick={declineModRequest} >Decline</button>
          <button type='button' onClick={acceptModRequest} >Accept</button>
        </>
      )}
    </div>
  )
}

export default SeeModChanges