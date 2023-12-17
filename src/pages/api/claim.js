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
        
        try {
          const newClaim = await prisma.claim.create({
          data: {
            transactionId: transactionId,
            userRenteeId: userRenteeId,
            userRenterId: userRenterId,
            ...claimData
          },
        })
        res.status(201).json(newClaim) 
        
        } catch (err) {
          console.log(err)
          res.status(500).json({error: err.message})
        }

        break

      case 'PATCH':
        const { claimId, updatedClaimData } = req.body

        try {
          const modifiedClaim = await prisma.claim.update({
            where: {
              id: claimId,
            },
            data: {
              ...updatedClaimData
            }
        }) 
        res.status(201).json(modifiedClaim)

        } catch (err) {
          console.log(err)
          console.log('mod details did not update')
          res.status(500).json({error: err.message})
          return
        }


        break
          
          
          
      case 'DELETE':

        try {
          const deletedClaimDeets = await prisma.claim.delete({
            where: {
              id: req.body.claimId,
            }
        }
        ) 
        console.log(deletedClaimDeets)
        res.status(201).json(deletedClaimDeets)
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