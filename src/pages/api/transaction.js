import { prisma } from '../../database/db'


export default async function handler(req, res) {

  switch (req.method) {
    case 'POST':
      const { 
        bookingId,
        createdAt,
        status
      } = req.body.newTransactionData

      console.log('req.body.itemId')
      console.log(req.body.userRenteeId)

      
      try {
        const newItem = await prisma.transaction.create({
          data: {
            bookingId,
            createdAt,
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
        
        let { updateData } = req.body       // will need a way to auth that escort sent req 
        
        try {const updatedTransaction = await prisma.transaction.update({
          where: {
            id: req.body.bookingId
          },
          data: {
            ...updateData
          },
        }) 
        res.status(201).json(updatedTransaction)
        } catch (err) {
          console.log(err)
          res.status(500).json({error: err.message})
        }
        break
        
    default:
      res.setHeader('Allow', ['POST', 'PATCH'])
  }

}
