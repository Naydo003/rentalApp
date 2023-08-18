import { prisma } from '@/database/db'

import axios from 'axios'

const checkInFreqToMinutesMap = {
  every30min: 30,
  every1Hour: 60,
  every2Hour: 120
}

async function sendToQstash(delay, message){
  try {
    const data  = await axios.post("https://qstash.upstash.io/v1/publish/https://scorty-website-fsmbc31mf-naydo003.vercel.app/api/security-manager", 
    {message: message || "no message with this Qstash"}, 
    {
      headers: {
        "Authorization": "Bearer eyJVc2VySUQiOiJlZTE5OTI4YS02NGQzLTRjOWYtODRhMy02M2ViZjg3Y2M5NTciLCJQYXNzd29yZCI6IjNlN2NmZjBlNzQ4YzRhY2Y5Y2M1MWU3NWEzMWMzNWQ1In0=",
        'Content-Type': 'application/json',
        "Upstash-Delay": `${delay}m`
      }
    })
    return

  } catch (err) {
    console.log(err)
    res.status(500).json({error: err.message})
    return
  }
}

async function sendCheckIn(){
  // try {
  //   const data  = await axios.post("https://qstash.upstash.io/v1/publish/https://scorty-website-fsmbc31mf-naydo003.vercel.app/api/security-manager", 
  //   {message: message || "no message with this Qstash"}, 
  //   {
  //     headers: {
  //       "Authorization": "Bearer eyJVc2VySUQiOiJlZTE5OTI4YS02NGQzLTRjOWYtODRhMy02M2ViZjg3Y2M5NTciLCJQYXNzd29yZCI6IjNlN2NmZjBlNzQ4YzRhY2Y5Y2M1MWU3NWEzMWMzNWQ1In0=",
  //       'Content-Type': 'application/json',
  //       "Upstash-Delay": `${delay}m`
  //     }
  //   })
  //   return

  // } catch (err) {
  //   console.log(err)
  //   res.status(500).json({error: err.message})
  //   return
  // }
}

export default async function handler(req, res) {

  let { bookingId, escortId, bookingUpdateData, timingData } = req.body
  let duration = timingData.duration/1000/60        // change to const

  switch (req.method) {


      case 'POST':
        console.log("POST activate hit")
        console.log(req.body)

        
        // let { bookingId, escortId, bookingUpdateData, timingData } = req.body       // will need a way to auth that escort sent req 
        
        if (timingData.checkInFrequency === 'begginingEnd') {
          console.log('begEnd')
          // sendToQstash(10, 'beg')
          setTimeout()
          sendToQstash(duration, 'end')
        } else if (timingData.checkInFrequency !== 'none') {
          sendToQstash(10, 'first')

          let freq = checkInFreqToMinutesMap[timingData.checkInFrequency]

          console.log('duration')
          console.log(duration)

          duration = 5

          if (duration >= 2*freq) {
            for (let period = freq; period < duration ; period = period+period) {
              console.log(period)
              sendToQstash(period, `period ${period} minute message`)
            }
          }
          sendToQstash(duration, 'last')
        }
        

        try {
          const updatedBooking = await prisma.booking.update({
            where: {
              id: bookingId
            },
            data: {
              ...bookingUpdateData
            },
          }) 

          res.status(201).json({message: 'maybe it worked'})

        } catch (err) {
          console.log(err)
          res.status(500).json({error: err.message})
        }
        break

      case 'PATCH':
        console.log("PATCH activate hit")
        console.log(req.body)

        

        // if (timingData.checkInFrequency === 'begginingEnd') {
        //   sendToQstash(10, 'beg')
        //   sendToQstash(duration, 'end')
        // } else if (timingData.checkInFrequency !== 'none') {
        //   sendToQstash(10, 'first')

        //   let period = checkInFreqToMinutesMap[timingData.checkInFrequency]

        //   if (duration >= 2*period) {
        //     for (period ; period < duration ; period+period) {
        //       sendToQstash(period, `period ${period} minute message`)
        //     }
        //   }
        //   sendToQstash(duration, 'last')
        // }


        res.status(201).json({message: 'ability to change frequency mid booking not yet live'})

        break

    default:
      res.setHeader('Allow', ['POST', 'PATCH'])
      res.status(425).end(`Method ${req.method} is not allowed`)

  }

}
