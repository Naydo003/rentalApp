import { prisma } from '../../utils/db'

export default async function handler(req, res) {

  switch (req.method) {

    case 'POST':
      const { name, email, phoneNumber, homeAddress } = req.body.newUserData
      
      try {const newAccount = await prisma.Account.create({
        data: {
          name,
          email,
          phoneNumber,
          homeAddress
        },
      }
      ) 
      res.status(201).json(newItem)
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