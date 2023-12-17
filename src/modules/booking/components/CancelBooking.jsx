import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Input from '@/common/components/FormElements/Input'
import axios from 'axios'
import { format } from 'date-fns'
import { toast } from 'react-toastify'


function CancelBooking({booking, setStatus, setModalContent }) {

  const { register, handleSubmit } = useForm()
  let router = useRouter()

  const bookingDate = new Date(booking.pickUpTime).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric'})


  const onSubmit = async (bookingData) => {

    console.log(bookingData)

    bookingData.initiatedByOwner = booking.owner ? false : true


    try {
      const { data } = await axios.post('/api/booking/cancel', { 
        bookingData,
        // escortId: escort.id, 
        // userId: userIdTemp
        bookingId: booking.id,
      })


      if (!data.id) {
        console.log("no Id")
        throw new Error('no cancellation document Id in response')
      }

      // switch to auth once implemented
      const actionBy = booking.owner.userAccount.name ? 'Owner' : 'User'
      
      // const newBookingModId = data.id
      // console.log(newBookingModId)

      toast.success(`You just cancelled your booking of ${booking.item?.name || booking.renter?.name}`, {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setStatus(`cancelledBy${actionBy}`)
      setModalContent(null)


    } catch (err){
      console.log('catch err')
      console.log(err)

      toast.error(`Your booking with ${booking.item?.name || booking.renter?.name} could not be cancelled because of a server error, please try again later`, {
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
    <>
      <main>
        <div className='small-container flex-1 overflow-auto'>
          <h1>You are about to cancel the booking on {bookingDate} of {booking.item?.name || booking.renter?.name}</h1>



          <form id='new-item-form' onSubmit={handleSubmit(onSubmit)}>  


            <Input
              id="userNote"
              element="textarea"
              label={`You can write a note to ${booking.owner?.userAccount.name || booking.renter?.userAccount.name} here`}
              validators={[]}
              errorText="Please enter a valid message"
              name={register('userNote').name}
              formOnChange={register('userNote').onChange}
              formOnBlur={register('userNote').onBlur}
              inputRef={register('userNote').ref} 
            />




            <button>Cancel Booking</button>


          </form>

          
        </div>
      </main>
    </>
  )
}

export default CancelBooking
