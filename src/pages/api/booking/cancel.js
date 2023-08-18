import { prisma } from '@/database/db'





export default async function handler(req, res) {

  // const userId = JSON.parse(req.query.userId)


  switch (req.method) {

      case 'POST':
        console.log(req.body)
        const { bookingData: newCancellationData, bookingId } = req.body 

        // We may have to move this to client side if any other forms use this end point.
        const status = newCancellationData.initiatedByEscort ? 'cancelledByEscort' : 'cancelledByUser'

        try {
          const updatedBooking = await prisma.booking.update({
            where: {
              id: bookingId
            },
            data: {
              status: status
            },
          }) 

        } catch (err) {
          // Send err data to reporting service
          console.log('status did not update')
          console.log(err.message)

          res.status(500).json({message: 'Booking was unable to be cancelled right now, try again later.'})
          return
        }

        try {
          const newCancellationDetails = await prisma.cancellationDetails.create({
          data: {
            bookingId: bookingId,
            ...newCancellationData
          },
        }
        ) 
        res.status(201).json(newCancellationDetails)
        } catch (err) {
          // Send err data to reporting service
          console.log('new cancellation document failed to create')
          console.log(err.message)
          // should undo the change to booking status
          
          res.status(500).json({error: err.message})
          return
        }
        break

    default:
      res.setHeader('Allow', ['POST'])
      res.status(425).end(`Method ${req.method} is not allowed`)
  }

}