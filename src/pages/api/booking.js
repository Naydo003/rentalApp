import { prisma } from '../../database/db'


export default async function handler(req, res) {

  switch (req.method) {
    case 'POST':
      const { 
        userRenterId,
        itemAgreedRate,
        itemAgreedEarlyCancelPolicy,
        itemAgreedLateCancelationPolicyTime,
        itemAgreedLateCancelationPolicyCharge,
        agreedDeposit,
        expectedTransactionCost,
        customCancellationPolicy,
        itemAgreedLateReturnPolicy,
        customLateReturnPolicy,
        pickUpTime,
        returnTime,
        renterNote,
        renteeNote,
        status 
      } = req.body.bookingData

      console.log('req.body.itemId')
      console.log(req.body.userRenteeId)

      
      try {
        const newItem = await prisma.booking.create({
          data: {
            itemId: req.body.itemId,
            userId: req.body.userRenteeId,
            userRenterId,
            itemAgreedRate,
            itemAgreedEarlyCancelPolicy,
            itemAgreedLateCancelationPolicyTime,
            itemAgreedLateCancelationPolicyCharge,
            agreedDeposit,
            expectedTransactionCost,
            customCancellationPolicy,
            itemAgreedLateReturnPolicy,
            customLateReturnPolicy,
            pickUpTime,
            returnTime,
            renterNote,
            renteeNote,
            status 
          }
        }) 
        res.status(201).json(newItem)

      } catch (err) {
        console.log(err)
      }

      break

      
      case 'PATCH':
        console.log("PATCH")
        console.log(req.body)
        
        let { bookingId, updateData } = req.body       // will need a way to auth that escort sent req 
        
        try {const updatedBooking = await prisma.booking.update({
          where: {
            id: bookingId
          },
          data: {
            ...updateData
          },
        }) 
        res.status(201).json(updatedBooking)
        } catch (err) {
          console.log(err)
          res.status(500).json({error: err.message})
        }
        break
        
    default:
      res.setHeader('Allow', ['POST', 'PATCH'])
  }

}
