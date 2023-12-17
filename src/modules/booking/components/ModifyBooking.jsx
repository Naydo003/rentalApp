import React, {useState, useContext, useEffect} from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { bookingDurationMilliSecondMap, timeframe, timeframeTitleMap } from '@/common/utilities/enumerables'
import Input from '@/common/components/FormElements/Input'
import { VALIDATOR_REQUIRE } from '@/common/utilities/validators'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import TimeSelector from '@/common/components/FormElements/TimeSelector';


function ModifyBooking({booking, setStatus, setModalContent, setModDetails}) {
  const router = useRouter()
  const pickUpDateTime = new Date(booking.pickUpTime)
  const returnDateTime = new Date(booking.returnTime)

  const { item } = booking
  const { register, handleSubmit, getValues, formState: { isDirty, dirtyFields } } = useForm({
    defaultValues: {

      pickUpTime: pickUpDateTime.toLocaleTimeString(undefined, {
        hour:   '2-digit',
        minute: '2-digit',
      }),
      returnTime: returnDateTime.toLocaleTimeString(undefined, {
        hour:   '2-digit',
        minute: '2-digit',
      }),
      renteeNote: '',
      cancelIfReject: false
    }
  })

  const [ startDate, setStartDate ] = useState(pickUpDateTime)
  const [ endDate, setEndDate ] = useState(returnDateTime)
  const [ price, setPrice ] = useState(booking.expectedTransactionCost)
  const [ rate, setRate ] = useState(booking.itemAgreedRate)
  
  
  const selectionRange = {
    startDate,
    endDate,
    key: 'selection'
  }
  
  const handleDateSelect = (ranges) => {
    console.log('ranges')
    console.log(ranges)
    
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
    
    // setDuration(calcDuration())
    
  }
  
  const calcDuration = () => {
    
    let pickUpDate = startDate
    let returnDate = endDate
    let pickUpTime = getValues('pickUpTime')
    let returnTime = getValues('returnTime')
    
    let pickUpDateTime = pickUpDate.setHours(pickUpTime.split(':')[0], pickUpTime.split(':')[1])
    let returnDateTime = returnDate.setHours(returnTime.split(':')[0], returnTime.split(':')[1])
    
    let duration = (returnDateTime - pickUpDateTime)/1000/60/60
    
    console.log('duration')
    console.log(duration)
    return duration
  }
  
  const [ duration, setDuration ] = useState(calcDuration())

  const calcPrice = () => {
    let priceEstimate
    if (item.rentPerHour) {
      priceEstimate = Math.ceil(duration) * item.rentPerHourPrice
      setRate(`$${item.rentPerHourPrice} per Hour for ${Math.ceil(duration)} hours`)
    } 
    
    if (item.rentPerDay){
      let priceEstimate2 = Math.ceil(duration / 24) * item.rentPerDayPrice 
      if (priceEstimate2 <= priceEstimate) {
        setRate(`$${item.rentPerDayPrice} per Day for ${Math.ceil(duration / 24)} days`)
        priceEstimate = priceEstimate2
      }
    } 
    
    if (item.rentPerWeek){
      let priceEstimate2 = Math.ceil(duration / 24 / 7) * item.rentPerWeekPrice 
      if (priceEstimate2 <= priceEstimate) {
        setRate(`$${item.rentPerWeekPrice} per Week for ${Math.ceil(duration / 24 / 7)} weeks`)
        priceEstimate = priceEstimate2
      }
    } 
    
    return priceEstimate
  }

  useEffect(() => {
    setDuration(calcDuration())
  }, [endDate])

  useEffect(() => {
    setPrice(calcPrice())
  }, [duration])




  const pickUpTimeOnChangeHandler = (event) => {
    register('pickUpTime').onChange(event)
    setDuration(calcDuration())
  }

  const returnOnChangeHandler = (event) => {
    register('returnTime').onChange(event)
    setDuration(calcDuration())
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
    if (newModData.startDate || newModData.pickUpTime || newModData.endDate || newModData.returnTime) {
      newModData.pickUpTime = formData.pickUpTime
      newModData.returnTime = formData.returnTime

      // two ways of getting time with date as datetime
      newModData.pickUpTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), newModData.pickUpTime.split(':')[0], newModData.pickUpTime.split(':')[1] )
      endDate.setHours(newModData.returnTime.split(':')[0], newModData.returnTime.split(':')[1])
      newModData.returnTime = endDate
  
      // We MUST get the time zone from location otherwise it will be set to wherever the browser is at the time.
  
      newModData.pickUpTime = newModData.pickUpTime.toISOString()
      newModData.returnTime = newModData.returnTime.toISOString()
    }

    // startDate and endDate are not required by api
    delete newModData.startDate
    delete newModData.endDate

    const requestBy = booking.renter?.userAccount.name ? 'Owner' : 'User'

    // If user logged in set to false otherwise and escort is making request so set to true.
    newModData.initiatedByOwner = requestBy === 'Owner' ? true : false

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


          <div className='w-full h-fit border-2'> 
            <DateRange 
              ranges={[selectionRange]} 
              onChange={handleDateSelect}
              minDate={new Date()}
            />
          </div>
          <form id='modify-booking-form' onSubmit={handleSubmit(onSubmit)}>  

            <input
              id='startDate'
              type='text'
              className='hidden'
              value={startDate}
              {...register('startDate')}
            />

            <input
              id='endDate'
              type='text'
              className='hidden'
              value={endDate}
              {...register('endDate')}
            />

            <TimeSelector
              id="pickUpTime"
              label="Pick Up Time?"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid time"
              // initialValue={escort.pickUpTime}
              // initialValid={true}
              name={register('pickUpTime').name}
              formOnChange={pickUpTimeOnChangeHandler}
              formOnBlur={register('pickUpTime').onBlur}
              inputRef={register('pickUpTime').ref} 
            />

            <TimeSelector
              id="returnTime"
              label="Drop off time"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid time"
              // initialValue={escort.returnTime}
              // initialValid={true}
              name={register('returnTime').name}
              formOnChange={returnOnChangeHandler}
              formOnBlur={register('returnTime').onBlur}
              inputRef={register('returnTime').ref} 
              variant='short'
            />

            <div className='flex flex-row justify-between' >
              <div className='' >
                <p>{rate}</p>         
              </div>
              <div className='' >
                <p>${price}</p>
              </div>
            </div>

            <Input
              id="renteeNote"
              element="textarea"
              label={`Please write a note to ${booking.owner?.userAccount.name || booking.user?.name} with what you would like for the booking`}
              validators={[]}
              errorText="Please enter a valid phone number"
              name={register('renteeNote').name}
              formOnChange={register('renteeNote').onChange}
              formOnBlur={register('renteeNote').onBlur}
              inputRef={register('renteeNote').ref} 
            />

            <div className='flex flex-row space-x-4' >
              <label className='form-label max-w-[70%]' htmlFor='cancelIfReject' >Will you like to cancel if these conditions cannot be accepted?</label>               {/*  htmlFor in jsx is same as for in standard html, keyword for was taken in js   */}
          
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
