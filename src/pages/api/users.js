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

      case 'GET':

        console.log(req)
        // const { name, email, phoneNumber, homeAddress } = req..userId



        // try {const newAccount = await prisma.Account.create({
        //   data: {
        //     name,
        //     email,
        //     phoneNumber,
        //     homeAddress
        //   },
        // }
        // ) 
        res.status(201).json(newItem)
        // } catch (err) {
        //   console.log(err)
        // }


    default:
      res.setHeader('Allow', ['POST'])
  }

}