import ButtonMain from '@/common/ButtonMain';
import React, { useEffect, useState } from 'react'
import { Calendar, DateRange } from 'react-date-range';
import { useForm } from 'react-hook-form';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Input from '@/common/components/FormElements/Input';
import Select from '@/common/components/FormElements/Select';
import { VALIDATOR_REQUIRE } from '@/common/utilities/validators';
import { timeframe } from '@/common/utilities/enumerables';
import TimeSelector from '@/common/components/FormElements/TimeSelector';





function BookingPanel({item, pickUpDateTime, returnDateTime}) {



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

  const [ startDate, setStartDate ] = useState(pickUpDateTime)
  const [ endDate, setEndDate ] = useState(returnDateTime)
  const [ duration, setDuration ] = useState()
  const [ price, setPrice ] = useState()
  const [ rate, setRate ] = useState()

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
  
  const calcPrice = () => {
    let priceEstimate
    if (item.rentPerHour) {
      priceEstimate = Math.ceil(duration) * item.rentPerHourPrice
      setRate(`$${item.rentPerHourPrice} per Hour`)
    } 
    
    if (item.rentPerDay){
      let priceEstimate2 = Math.ceil(duration / 24) * item.rentPerDayPrice 
      if (priceEstimate2 <= priceEstimate) {
        setRate(`$${item.rentPerDayPrice} per Day for ${Math.ceil(duration / 24)} days`)
        priceEstimate = priceEstimate2
      }
    } 
    
    if (item.rentPerWeek){
      priceEstimate2 = Math.ceil(duration / 24 / 7) * item.rentPerWeekPrice 
      if (priceEstimate2 <= priceEstimate) {
        setRate(`$${item.rentPerWeekPrice} per Week for ${Math.ceil(duration / 24 / 7)} weeks`)
        priceEstimate = priceEstimate2
      }
    } 
    
    return priceEstimate
  }

  useEffect(() => {
    setDuration(calcDuration())
    setPrice(calcPrice())

  }, [])

  const calcEndTime = (duration) => {

    let timeToBeAdded = bookingDurationMilliSecondMap[duration]
    // console.log(timeToBeAdded)
    let pickUpTime = startDate.setHours(getValues('pickUpTime').split(':')[0], getValues('pickUpTime').split(':')[1])
    // console.log(pickUpTime)
    let returnTimeMS = pickUpTime + timeToBeAdded
    // console.log(returnTimeMS)
    let returnTime = new Date(returnTimeMS)
    // console.log(returnTime)
    let returnTimeString = returnTime.toLocaleTimeString(undefined, {
      hour:   '2-digit',
      minute: '2-digit',
    })
    // returnTime.getHours().toFixed(2).toString().concat(':', returnTime.getMinutes().toFixed(2).toString())
    // console.log(returnTimeString)
    setValue('returnTime', returnTimeString)
    setEndDate(returnTime)
  }

  const durationChangeHandler = (event) => {
    register('duration').onChange(event)
    calcEndTime(event.target.value)
  }

  const pickUpTimeBlurHandler = (event) => {
    register('pickUpTime').onBlur(event)
    // const duration = getValues('duration') 
    // console.log(duration)
    // console.log(bookingDurationMilliSecondMap[duration])
    // if (bookingDurationMilliSecondMap[duration]) {

    //   calcEndTime(duration)
    // }
  }



  const onSubmit = async (bookingData) => {

    console.log(bookingData)

    calcDuration()

    // delete bookingData.duration

    // two ways of getting time with date as datetime
    bookingData.pickUpTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), bookingData.pickUpTime.split(':')[0], bookingData.pickUpTime.split(':')[1] )
    endDate.setHours(bookingData.returnTime.split(':')[0], bookingData.returnTime.split(':')[1])
    bookingData.returnTime = endDate

    // We MUST get the time zone from location otherwise it will be set to wherever the browser is at the time.

    bookingData.pickUpTime = bookingData.pickUpTime.toISOString()
    bookingData.returnTime = bookingData.returnTime.toISOString()


    console.log('bookingData2')
    console.log(bookingData)


    let userIdTemp = 1

    // try {
    //   const { data } = await axios.post('/api/booking', { 
    //     bookingData,
    //     escortId: escort.id, 
    //     userId: userIdTemp
    //   })      
    //   if (!data.id) {
    //     console.log("no Id")
    //     return
    //   }
      
    //   const newBookingId = data.id

    //   router.push(`/users/${userIdTemp}/bookings`)
    // } catch (err){
    //   console.log(err)
    // }                                        
  }

  return (
    <div className='h-80 border border-gray-600'>

      <div className='w-full h-fit border-2'> 
        <DateRange 
          ranges={[selectionRange]} 
          onChange={handleDateSelect}
          minDate={new Date()}
        />
      </div>
      <form id='booking-panel' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>

        {/* <Input 
          id="pickUpTime"
          element="input"
          type="text"
          label="Pick Up Time?"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid time"
          // initialValue={escort.pickUpTime}
          // initialValid={true}
          name={register('pickUpTime').name}
          formOnChange={register('pickUpTime').onChange}
          formOnBlur={pickUpTimeBlurHandler}
          inputRef={register('pickUpTime').ref} 
          variant='short'
        /> */}

        <TimeSelector
          id="pickUpTime"
          label="Pick Up Time?"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid time"
          // initialValue={escort.pickUpTime}
          // initialValid={true}
          name={register('pickUpTime').name}
          formOnChange={register('pickUpTime').onChange}
          formOnBlur={pickUpTimeBlurHandler}
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
          formOnChange={register('returnTime').onChange}
          formOnBlur={register('returnTime').onBlur}
          inputRef={register('returnTime').ref} 
          variant='short'
        />

        {/* <Input 
          id="returnTime"
          element="input"
          type="text"
          label="Drop off time"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid time"
          // initialValue={escort.returnTime}
          // initialValid={true}
          name={register('returnTime').name}
          formOnChange={register('returnTime').onChange}
          formOnBlur={register('returnTime').onBlur}
          inputRef={register('returnTime').ref} 
          variant='short'
        /> */}


        <div className='flex flex-row justify-between' >
          <div className='' >
            <p>{rate}</p>         
          </div>
          <div className='' >
            <p>${price}</p>
          </div>
        </div>
        
      </form>
      <ButtonMain type='submit' formId='booking-panel'>Book</ButtonMain>
    </div>
  )
}

export default BookingPanel