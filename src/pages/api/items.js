// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from '../../utils/db'

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
      console.log(req.body.updateData)
      const { pickUpAddress, locationCoordinates, category, description, brand, model, age, importantNote, size, goodForIndicator, 
              specialItem, make, year, odometer, label, author, genre, condition, itemPhotos, active, 
              itemNewValue, rentPerHour, rentPerHourPrice, rentPerDay, rentPerDayPrice, rentPerWeek, rentPerWeekPrice, minimumRentalPeriod, 
              earlyCancellationPolicy, lateCancellationPolicy, customCancellationPolicy, lateReturnPolicy, reviews, bookings, insuranced, hasClaims} = req.body.updateData
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
          category: updateData.category,
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
          itemPhotos,
          active,
          itemNewValue,
          rentPerHour,
          rentPerHourPrice,
          rentPerDay,
          rentPerDayPrice,
          rentPerWeek,
          rentPerWeekPrice,
          minimumRentalPeriod,
          earlyCancellationPolicy,
          lateCancellationPolicy,
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
