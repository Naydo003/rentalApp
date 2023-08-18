import React, { useEffect, useState } from 'react'

function PriceCalc({item, pickUpDateTime, returnDateTime, setAgreedRate, setAgreedPrice}) {
  const calcDuration = () => {
  
    let duration = (returnDateTime - pickUpDateTime)/1000/60/60

    console.log(duration)
  
    return duration
  }
  const [ duration, setDuration ] = useState(calcDuration())
  const [ price, setPrice ] = useState()
  const [ rate, setRate ] = useState()

  console.log('PriceCalc DateTimes')
  console.log(pickUpDateTime)
  console.log(returnDateTime)

  
  const calcPrice = () => {
    let priceEstimate
    if (item.rentPerHour) {
      priceEstimate = Math.ceil(duration) * item.rentPerHourPrice
      setRate(`$${item.rentPerHourPrice} per Hour for ${Math.ceil(duration)} hours`)
      setAgreedRate(`${item.rentPerHourPrice}/Hour`)
    } 
    
    if (item.rentPerDay){
      let priceEstimate2 = Math.ceil(duration / 24) * item.rentPerDayPrice 
      if (priceEstimate2 <= priceEstimate) {
        setRate(`$${item.rentPerDayPrice} per Day for ${Math.ceil(duration / 24)} days`)
        setAgreedRate(`${item.rentPerDayPrice}/Day`)
        priceEstimate = priceEstimate2
      }
    } 
    
    if (item.rentPerWeek){
      let priceEstimate2 = Math.ceil(duration / 24 / 7) * item.rentPerWeekPrice 
      if (priceEstimate2 <= priceEstimate) {
        setRate(`$${item.rentPerWeekPrice} per Week for ${Math.ceil(duration / 24 / 7)} weeks`)
        setAgreedRate(`${item.rentPerWeekPrice}/Week`)
        priceEstimate = priceEstimate2
      }
    } 
    
    setAgreedPrice(priceEstimate)
    return priceEstimate
  }

  useEffect(() => {
    setDuration(calcDuration())
    setPrice(calcPrice())
  }, [pickUpDateTime, returnDateTime])



  return (
    <div className='border-t mx-5 py-5' >
      <div className='' >
        <p>{rate}</p>         
      </div>
      <div className='' >
        <p>${price}</p>
      </div>
    </div>
  )
}

export default PriceCalc