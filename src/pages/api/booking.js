import { prisma } from '../../database/db'


export default async function handler(req, res) {

  switch (req.method) {
    case 'POST':
      const { 
        itemAgreedRate,
        itemAgreedEarlyCancelPolicy,
        itemAgreedLateCancelationPolicyTime,
        itemAgreedLateCancelationPolicyCharge,
        agreedDeposit,
        expectedtransactionCost,
        customCancellationPolicy,
        itemAgreedLateReturnPolicy,
        customLateReturnPolicy,
        pickUpTime,
        returnTime,
        renterNote,
        renteeNote,
        status 
      } = req.body.bookingData

      console.log('req.body.itemId')
      console.log(req.body.userRenteeId)

      
      try {
        const newItem = await prisma.booking.create({
          data: {
            itemId: req.body.itemId,
            userId: req.body.userRenteeId,
            itemAgreedRate,
            itemAgreedEarlyCancelPolicy,
            itemAgreedLateCancelationPolicyTime,
            itemAgreedLateCancelationPolicyCharge,
            agreedDeposit,
            expectedtransactionCost,
            customCancellationPolicy,
            itemAgreedLateReturnPolicy,
            customLateReturnPolicy,
            pickUpTime,
            returnTime,
            renterNote,
            renteeNote,
            status 
          }
        }) 
        res.status(201).json(newItem)

      } catch (err) {
        console.log(err)
      }

      break

    case 'PATCH':


      console.log('PAATCHHHHHHHHHHH')
      console.log(req.body)


      console.log('PAATCHHHHHHHHHHH 2222222')
      console.log(req.body)
      // console.log(req.files)
  
  
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
