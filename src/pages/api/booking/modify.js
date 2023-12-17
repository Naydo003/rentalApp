import { prisma } from '@/database/db'





export default async function handler(req, res) {

  // const userId = JSON.parse(req.query.userId)



  switch (req.method) {

      case 'GET':
        console.log("GET")
        
        const bookingId = JSON.parse(req.query.bookingId)
        console.log(bookingId)

        // note we could exclude createdAt and UpdatedAt but currently prisma has no easy way of doing this. I will wait until exclude update comes out
        try {
          const bookingModDetails = await prisma.bookingModDetails.findMany({
            where: {
              bookingId: bookingId,
            },
            orderBy: {
              createdAt: 'desc'
            },
            take: 1
          })
        console.log(bookingModDetails)
        res.status(201).json(bookingModDetails)
        } catch (err) {
          console.log(err)
          res.status(500).json({error: err.message})
        }
        break

      case 'POST':
        console.log(req.body)
        const { newModData, bookingId: BookingIdForMod, bookingUpdateData } = req.body
        let newBookingMod
        try {
          newBookingMod = await prisma.bookingModDetails.create({
          data: {
            bookingId: BookingIdForMod,
            ...newModData
          },
        }
        ) 
        
        } catch (err) {
          console.log(err)
          res.status(500).json({error: err.message})
        }

        try {
          const updatedBooking = await prisma.booking.update({
            where: {
              id: BookingIdForMod
            },
            data: {
              ...bookingUpdateData
            },
          }) 
          res.status(201).json(newBookingMod)
        } catch (err) {
          console.log('status did not update')
          res.status(500).json({error: err.message})
        }

        break

      case 'PATCH':
        const { modDetailsId: modDetailsIdForPatch, modDetailsData, bookingId: BookingIdForPatch, bookingUpdateData: bookingUpdateDataForPatch } = req.body

        try {
          const modifiedBooking = await prisma.bookingModDetails.update({
            where: {
              id: modDetailsIdForPatch,
            },
            data: {
              ...modDetailsData
            }
        }) 

        } catch (err) {
          console.log(err)
          console.log('mod details did not update')
          res.status(500).json({error: err.message})
          return
        }

        if (bookingUpdateDataForPatch.status === 'cancelledByUser' || bookingUpdateDataForPatch.status === 'cancelledByEscort') {
          let newCancellationData = {
            bookingId: BookingIdForPatch,
            initiatedByEscort: bookingUpdateDataForPatch.status === 'cancelledByEscort',
            escortNote: "Automatically cancelled because mod request rejected.",
            userNote: "Automatically cancelled because mod request rejected.",
          }

          try {
            const newBookingMod = await prisma.cancellationDetails.create({
              data: {
                bookingId: BookingIdForPatch,
                ...newCancellationData
              },
            }) 
            res.status(201).json(newBookingMod)
          } catch (err) {
            // Send err data to reporting service
            console.log('new cancellation document failed to create')
            console.log(err.message)
            res.status(500).json({error: err.message})
            return
          }
        }
        
        try {
          const updatedBooking = await prisma.booking.update({
            where: {
              id: BookingIdForPatch
            },
            data: {
              ...bookingUpdateDataForPatch
            },
          }) 
 
          res.status(201).json(updatedBooking)
        } catch (err) {
          console.log('booking did not update')
          res.status(500).json({error: err.message})
        }

        break
          
          
          
      case 'DELETE':
        const { bookingId: bookingIdForRecall, modDetailsId, bookingUpdateData: bookingUpdateDataForModDelete } = req.body
        

        try {
          const updatedBooking = await prisma.booking.update({
            where: {
              id: bookingIdForRecall
            },
            data: {
              ...bookingUpdateDataForModDelete
            },
          }) 
        } catch (err) {
          console.log('status did not update')
          res.status(500).json({error: err.message})
          return
        }

        try {
          const deletedModDeets = await prisma.bookingModDetails.delete({
            where: {
              id: modDetailsId,
            }
        }
        ) 
        console.log(deletedModDeets)
        res.status(201).json(deletedModDeets)
        } catch (err) {
          console.log(err)
          res.status(500).json({error: err.message})
        }
        break

    default:
      res.setHeader('Allow', ['POST', 'DELETE', 'PATCH', 'GET'])
      res.status(425).end(`Method ${req.method} is not allowed`)
  }

}