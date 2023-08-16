
import { prisma } from '../../database/db'

export default async function handler(req, res) {

  switch (req.method) {
    case 'POST':
      console.log("rent prof POST")
      const accountId = req.body.accountId        // maybe should come through context
      console.log(accountId)
      
      try {const newRenterProfile = await prisma.userRenterProfile.create({
        data: {
          accountId
        },
      }
      ) 
      res.status(201).json(newRenterProfile)
      } catch (err) {
        console.log(err)
      }
      break
    default:
      res.setHeader('Allow', ['POST'])
  }

}
