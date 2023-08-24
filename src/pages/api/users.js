import { prisma } from '../../database/db'

export default async function handler(req, res) {

  switch (req.method) {

    case 'POST':

    console.log('users post recieved')
      const { name, email, phoneNumber, homeAddress } = req.body.newUserData
      
      try {
        const newAccount = await prisma.Account.create({
          data: {
            name,
            email,
            phoneNumber,
            homeAddress
          },
        }) 

        const newRenteeProfile = await prisma.userRenteeProfile.create({
          data: {
            accountId: newAccount.id
          },
        }) 
        
        res.status(201).json({newAccount, newRenteeProfile})

      } catch (err) {
        console.log(err)
      }
      break

      case 'PATCH':

      const { userData} = req.body


      try {const updatedUser = await prisma.account.update({
        where: {
          id: req.body.accountId
        },
        data: {
          name: userData.name,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
          homeAddress: userData.email,
        },
      }
      ) 
      res.status(201).json(updatedUser)
      } catch (err) {
        console.log(err)
      }
      break


    default:
      res.setHeader('Allow', ['POST', 'PATCH'])
  }

}