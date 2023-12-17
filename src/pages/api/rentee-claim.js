import { prisma } from '@/database/db'





export default async function handler(req, res) {

  // const userId = JSON.parse(req.query.userId)



  switch (req.method) {

      case 'GET':
        console.log("GET")
        
        // const bookingId = JSON.parse(req.query.bookingId)
        // console.log(bookingId)

        // note we could exclude createdAt and UpdatedAt but currently prisma has no easy way of doing this. I will wait until exclude update comes out
        try {
          const bookingModDetails = await prisma.itemReview.findMany({
            where: {
              // bookingId: bookingId,
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
        const { transactionId, userRenteeId, userRenterId, claimData } = req.body
        let newRenteeClaim
        try {
          newRenteeClaim = await prisma.renteeClaim.create({
          data: {
            transactionId: transactionId,
            userRenteeId: userRenteeId,
            userRenterId: userRenterId,
            ...claimData
          },
        }) 
        res.status(201).json(newRenteeClaim)
        
        } catch (err) {
          console.log(err)
          res.status(500).json({error: err.message})
        }

        break

      case 'PATCH':
        const { claimId, updatedClaimData } = req.body

        try {
          const updatedRenteeClaim = await prisma.renteeClaim.update({
            where: {
              id: claimId,
            },
            data: {
              ...updatedClaimData
            }
        }) 
        res.status(201).json(updatedRenteeClaim)
        } catch (err) {
          console.log(err)
          console.log('mod details did not update')
          res.status(500).json({error: err.message})
          return
        }


        break
          
          
          
      case 'DELETE':

        try {
          const deletedRenteeClaim = await prisma.renteeClaim.delete({
            where: {
              id: req.body.reviewId,
            }
        }
        ) 
        console.log(deletedRenteeClaim)
        res.status(201).json(deletedRenteeClaim)
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