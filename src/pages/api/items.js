// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import nc from "next-connect";
import { prisma } from '../../database/db'
const cloudinary = require('cloudinary').v2;   // an online storage specifically for images. Has certian functionality that is usefule for images such as cropping, compressing etc.
const { CloudinaryStorage } = require('multer-storage-cloudinary');  // This is an npm that helps us use multer and cloudinary together
const multer  = require('multer');


// all in .env file. .env must be in base level.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

console.log(process.env.CLOUDINARY_KEY)

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'rentalApp',
    allowedFormats: ['jpeg', 'png', 'jpg']
  }
});

const upload = multer({ storage });

// module.exports = {
//   cloudinary,
//   storage
// }
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }

export default async function handler(req, res) {

  switch (req.method) {
    case 'POST':
      const { name } = req.body.newItemData
      const ownersRenterId  = req.body.userRenterId
      
      
      try {const newItem = await prisma.item.create({
        data: {
          name,
          ownersRenterId
        },
      }
      ) 
      res.status(201).json(newItem)
      } catch (err) {
        console.log(err)
      }
      break

    case 'PATCH':


      console.log('PAATCHHHHHHHHHHH')
      console.log(req.body)


      upload.array('image')
      console.log('PAATCHHHHHHHHHHH 2222222')
      console.log(req.body)
      // console.log(req.files)
  
      const { pickUpAddress, locationCoordinates, category, description, brand, model, age, importantNote, size, goodForIndicator, 
              specialItem, make, year, odometer, label, author, genre, condition, itemPhotos, active, 
              itemNewValue, rentPerHour, rentPerHourPrice, rentPerDay, rentPerDayPrice, rentPerWeek, rentPerWeekPrice, minimumRentalPeriod, 
              weekendRentPerHour, weekendRentPerHourPrice, weekendRentPerDay, weekendRentPerDayPrice, weekendMinimumRentalPeriod, 
              generalCancellationPolicy, lateCancellationPolicyTime, lateCancellationPolicyCharge, customCancellationPolicy, 
              lateReturnPolicy, reviews, bookings, insuranced, hasClaims} = req.body.updateData
      const { updateData } = req.body
      const itemId  = req.body.itemId
      
      
      try {const updatedItem = await prisma.item.update({
        where: {
          id: itemId
        },
        data: {
          name: updateData.newName,
          pickUpAddress,
          locationCoordinates,
          category,
          description,
          brand,
          model,
          age,
          importantNote,
          size,
          goodForIndicator,
          specialItem,
          carMake: make,
          yearOfManufacture: year,
          odometer,
          clothingLabel: label,
          bookAuthor: author,
          bookGenre: genre,
          condition,
          itemPhotos: itemPhotos && {
            createMany: {
              data: itemPhotos
            }
          },
          active,
          itemNewValue,
          rentPerHour,
          rentPerHourPrice,
          rentPerDay,
          rentPerDayPrice,
          rentPerWeek,
          rentPerWeekPrice,
          minimumRentalPeriod,
          weekendRentPerHour, 
          weekendRentPerHourPrice, 
          weekendRentPerDay, 
          weekendRentPerDayPrice, 
          weekendMinimumRentalPeriod,
          generalCancellationPolicy, 
          lateCancellationPolicyTime, 
          lateCancellationPolicyCharge, 
          customCancellationPolicy,
          lateReturnPolicy,
          reviews,
          bookings,
          insuranced,
          hasClaims
        },
      }
      ) 
      res.status(201).json(updatedItem)
      } catch (err) {
        console.log(err)
      }
      break
    default:
      res.setHeader('Allow', ['POST', 'PATCH'])
  }

}
