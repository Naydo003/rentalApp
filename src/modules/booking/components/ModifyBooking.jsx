import React, {useState, useContext, useEffect} from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { bookingDurationMilliSecondMap, timeframe, timeframeTitleMap } from '@/common/utilities/enumerables'
import Input from '@/common/components/FormElements/Input'
import { VALIDATOR_REQUIRE } from '@/common/utilities/validators'
import axios from 'axios'
import { toast } from 'react-toastify'

import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { set } from 'date-fns'


function ModifyBooking({booking, setStatus, setModalContent, setModDetails}) {
  const [ startDate, setStartDate ] = useState(new Date(booking.pickUpTime))
  const [ endDate, setEndDate ] = useState(new Date(booking.returnTime))
  const [ endTime, setEndTime ] = useState('')

  const { register, handleSubmit, setValue, getValues, formState: { isDirty, dirtyFields } } = useForm({  
    defaultValues: {
      pickUpDate: new Date(booking.pickUpTime),
      returnTime: new Date(booking.returnTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) || '',
      endTime: new Date(booking.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) || '',
      incall: booking.incall || false,
      location: booking.location || null,
      userNote: ''
    }
  })
  let router = useRouter()



  const selectionRange = {
    startDate,
    endDate,
    key: 'selection'
  }

  const handleDateSelect = (ranges) => {
    console.log(ranges)
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
    setValue('pickUpDate', ranges.selection.startDate, { shouldDirty: true })
  }




  const calcEndTime = (duration) => {

    let timeToBeAdded = bookingDurationMilliSecondMap[duration]
    // console.log(timeToBeAdded)
    let startTime = startDate.setHours(getValues('startTime').split(':')[0], getValues('startTime').split(':')[1])
    // console.log(startTime)
    let endTimeMS = startTime + timeToBeAdded
    // console.log(endTimeMS)
    let endTime = new Date(endTimeMS)
    // console.log(endTime)
    let endTimeString = endTime.toLocaleTimeString(undefined, {
      hour:   '2-digit',
      minute: '2-digit',
    })
    // endTime.getHours().toFixed(2).toString().concat(':', endTime.getMinutes().toFixed(2).toString())
    // console.log(endTimeString)
    setValue('endTime', endTimeString, { shouldDirty: true })
    setEndDate(endTime)
  }

  const durationChangeHandler = (event) => {
    register('duration').onChange(event)
    calcEndTime(event.target.value)
  }

  const startTimeBlurHandler = (event) => {
    register('startTime').onBlur(event)
    const duration = getValues('duration') 
    console.log(duration)
    console.log(bookingDurationMilliSecondMap[duration])
    if (bookingDurationMilliSecondMap[duration]) {

      calcEndTime(duration)
    }
  }


  const onSubmit = async (formData) => {

    // console.log(dirtyFields)
    console.log('formData')
    // console.log(formData)
    
    // if the only modified formData is the cancelIfReject toggle abort submit.
    if (dirtyFields.cancelIfReject && Object.keys(dirtyFields).length === 1 ) {
      console.log('only mod if cancel toggle modified')
      return
    }

    // assign only the dirty field to bookingData
    let newModData = {}
    Object.keys(dirtyFields).forEach((key)=> {
      newModData[key] = formData[key]
    })

    // If any time related fields have changed ensure both start and end time are in newModData and manipulate them to be correctly formatted
    if (newModData.pickUpDate || newModData.Time || newModData.duration || newModData.endTime) {
      newModData.startTime = formData.startTime
      newModData.endTime = formData.endTime

      // two ways of getting time with date as datetime
      newModData.startTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), newModData.startTime.split(':')[0], newModData.startTime.split(':')[1] )
      endDate.setHours(newModData.endTime.split(':')[0], newModData.endTime.split(':')[1])
      newModData.endTime = endDate
  
      // We MUST get the time zone from location otherwise it will be set to wherever the browser is at the time.
  
      newModData.startTime = newModData.startTime.toISOString()
      newModData.endTime = newModData.endTime.toISOString()
    }

    // startDate is not required by api
    delete newModData.startDate

    let userIdTemp = 9

    const requestBy = booking.renter?.userAccount.name ? 'Escort' : 'User'

    // If user logged in set to false otherwise and escort is making request so set to true.
    newModData.initiatedByRenter = requestBy === 'Escort' ? true : false

    newModData.status = 'requested'

    // console.log('bookingData2')
    // console.log(newModData)

    
    try {
      const { data } = await axios.post('/api/booking/modify', { 
        newModData,
        // escortId: escort.id, 
        // userId: userIdTemp
        bookingUpdateData: { status: newModData.cancelIfReject ? `modRequestOrCancelBy${requestBy}` : `modRequestedBy${requestBy}` },
        bookingId: booking.id,
      })      
      if (!data.id) {
        console.log("no Id")
        return
      }

      console.log(data)
      

      setStatus(data.cancelIfReject ? `modRequestOrCancelBy${requestBy}` : `modRequestedBy${requestBy}`)
      setModDetails(data)
      setModalContent(null)
      toast.success(`You just requested to modify your booking with ${booking.item?.name || booking.renter?.name}`, {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    } catch (err){
      console.log(err)

      toast.error(`Your booking with ${booking.escort?.name || booking.user?.name} could not be modified because of a server error, please try again later`, {
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
        <div className='w-full max-w-[640px] px-5 py-5 sm:py-10 mx-auto flex-1 overflow-auto'>
          <h1>What would you like to change with your Booking for {booking.item?.name || booking.renter?.userAccount.name}</h1>

          <div className='w-[600px] h-[400px] border-2'> 
            <DateRangePicker 
              ranges={[selectionRange]} 
              onChange={handleDateSelect}
              minDate={new Date()}
              size="sm"
            />

          </div>

          <form id='new-item-form' onSubmit={handleSubmit(onSubmit)}>  

            <input
              id='cancelIfReject'
              type='text'
              className='hidden'
              value={startDate}
              {...register('startDate')}
            />

            <Input 
              id="startTime"
              element="input"
              type="text"
              label="What time would you like to start?"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid time"
              // initialValue={escort.startTime}
              // initialValid={true}
              name={register('startTime').name}
              formOnChange={register('startTime').onChange}
              formOnBlur={startTimeBlurHandler}
              inputRef={register('startTime').ref} 
            />


            <Input 
              id="endTime"
              element="input"
              type="text"
              label="What time are you expecting to finish?"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid time"
              // initialValue={escort.endTime}
              // initialValid={true}
              name={register('endTime').name}
              formOnChange={register('endTime').onChange}
              formOnBlur={register('endTime').onBlur}
              inputRef={register('endTime').ref} 
            />

            





            <Input
              id="userNote"
              element="textarea"
              label={`Please write a note to ${booking.escort?.name || booking.user?.name} with what you would like for the booking`}
              validators={[]}
              errorText="Please enter a valid phone number"
              name={register('userNote').name}
              formOnChange={register('userNote').onChange}
              formOnBlur={register('userNote').onBlur}
              inputRef={register('userNote').ref} 
            />

            <div className='flex flex-row space-x-4' >
              <label className='form-label max-w-[70%]' htmlFor='cancelIfReject' >Will you like to cancel if these conditions cannot be accepted?</label>               {/*  htmlFor in jsx is same as for in standard html, keyword for was taken in js    */}
          
              <input 
                id='cancelIfReject'
                type='checkbox'
                className=''
                {...register('cancelIfReject')}
              />  
            </div>
            



            <div className='mt-4 mx-auto max-w-[300px]' >
              <button className='secondary-button mt-4  max-w-[300px]' disabled={!isDirty}>Submit Booking modification</button>
  
            </div>
            

          </form>

          
        </div>
      </main>
    </>
  )
}

export default ModifyBooking
