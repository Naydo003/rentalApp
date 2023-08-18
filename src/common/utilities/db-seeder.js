
import axios from "axios";


import { categories, specialItem, goodForIndicator, condition, rentalPeriods, cancellationPolicyCharge, cancellationPolicyTime, lateReturnPolicies } from "@/common/utilities/enumerables";
import { useContext } from "react";
import { UserContext } from "../contexts/user-context";


const loremIpsum = "Lorem ipsum is a name for a common type of placeholder text. Also known as filler or dummy text, this is text copy that serves to fill a space without saying anything meaningful. It's essentially nonsense text that still gives an idea of what real words will look like in the final product."
const loremIpsumSmall = "Lorem ipsum is a name for a common type of placeholder text. Also known as filler or dummy text"

const country = [ 'English', 'American', 'Spanish', 'French', 'Chinese', 'Japanese']
const colour = [ 'Red', 'Yellow', 'Blue', 'Green', 'Purple', 'Black', 'White']
const descword = [ 'Fast', 'Big', 'Slow', 'Medium', 'Small', 'Clean', 'Immaculate', 'Best', 'Flogged']
const item = [ 'drill', 'car', 'saw', 'mixer', 'surfboard', 'bike', 'skiis', 'skate board', 'tent', 'table tennis table', 'football', 'esky', 'speakers']
const fname = [ 'Sally', 'Kate', 'Ashleigh', 'Brooke', 'Alex', 'Holly', 'Britany', 'Lena', 'Riley', 'Danni', 'Tiffany', 'Lucy', 'Barbie', 'Baby', 'Queen']
const lname = [ 'Storm', 'Rider', 'Star', 'Shell', 'Small', 'Legs', 'Harper', 'Treloar', 'Gethard', 'Squirt', 'Sponge', 'Big' ]
const city = [ 'Sydney', 'Melbourne', 'Adelaide', 'Brisbane', 'Perth', 'Darwin', 'Hobart', 'Canbera',]
const nationality = ['Australian', 'Aussie', 'British', 'French', 'Russian', 'Thai']
const suburb = [ 'Prospect, SA', 'Gawler, SA', 'Elizabeth, SA', 'Norwood, SA', 'Kensington, SA', 'Glynde, SA', 'Henley Beach, SA']
const brand = [ 'Bosch', 'Makita', 'Tent Tipi', 'Coleman', 'Sunbeam', 'Westinghouse', 'Fisher & Pykle', 'K-mart', 'Yamaha']
const model = [ 'AX1', 'B25', 'ZX47', 'Tough', 'Banshee', '007 Edition']
const sizes = [ 'Small', 'Medium', 'Large', 'Extra Large', '8', '11', '42', '10' ]

export async function seed(number, userRenterId, accountId) {




  for (let i=0; i < number; i++){

    let newId
    let itemId
    let name = country[Math.floor(Math.random()*colour.length)] + ' ' + colour[Math.floor(Math.random()*colour.length)] + ' ' + item[Math.floor(Math.random()*item.length)] + ' ' + descword[Math.floor(Math.random()*descword.length)]
    let newItemData = {
      name: name
    }
    let incalls = (Math.random()*2) > 1 ? true : false
    let renterId
    if (!userRenterId) {
      try {
        const { data } = await axios.post('/api/renter-profile', { accountId })
        console.log("*************************************************************************")
        console.log(data)
        setUserRenterId(data.id)
        renterId = data.id
      } catch (err){
        console.log(err)
      }
    }

    try {
      const { data } = await axios.post('/api/items', { newItemData, userRenterId: renterId || userRenterId })
      const newId = data.id
      
      if (!newId) {
        console.log("no itemId")
        return
      }
      itemId = newId
    } catch (err){
      console.log(err)
    }      

    let updateData = {
      pickUpAdress: suburb[Math.floor(Math.random()*suburb.length)],
      category: categories[Math.floor(Math.random()*categories.length)].name,
      description: loremIpsum + ' ' + loremIpsum,
      brand: brand[Math.floor(Math.random()*brand.length)],
      model: model[Math.floor(Math.random()*model.length)],
      age: Math.floor(Math.random()*40 +1),
      importantNote: loremIpsumSmall,
      answer2: loremIpsumSmall,
      answer3: loremIpsumSmall,
      size: sizes[Math.floor(Math.random()*sizes.length)],
      goodForIndicator: goodForIndicator[Math.floor(Math.random()*goodForIndicator.length)].name,
      specialItem: specialItem[Math.floor(Math.random()*specialItem.length)].name,
      condition: condition[Math.floor(Math.random()*condition.length)].name,
      itemPhotos: [{imageUrl: 'https://images.unsplash.com/photo-1611145434336-2324aa4079cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80', order: 1}, {imageUrl: 'https://images.unsplash.com/photo-1582639590011-f5a8416d1101?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=898&q=80', order: 2 }, {imageUrl: 'https://images.unsplash.com/photo-1611145434336-2324aa4079cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80', order: 3}, {imageUrl: 'https://images.unsplash.com/photo-1582639590011-f5a8416d1101?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=898&q=80', order: 4 }],
      active: (Math.random()*4) > 1 ? true : false,
      itemNewValue: Math.floor(Math.random()*1000 + 150),
      rentPerHour: true,
      rentPerHourPrice: Math.floor(Math.random()*50 + 1),
      rentPerDay: (Math.random()*3) > 1 ? true : false,
      rentPerDayPrice: Math.floor(Math.random()*150 + 10),
      rentPerWeek: (Math.random()*3) > 2 ? true : false,
      rentPerWeekPrice: Math.floor(Math.random()*150 + 10),
      weekendRentPerHour: (Math.random()*3) > 2 ? true : false,
      weekendRentPerHourPrice: Math.floor(Math.random()*50 + 1),
      weekendRentPerDay: (Math.random()*4) > 3 ? true : false,
      weekendRentPerDayPrice: Math.floor(Math.random()*150 + 10),
      minimumRentalPeriod: rentalPeriods[Math.floor(Math.random()*rentalPeriods.length)].name,
      weekendMinimumRentalPeriod: rentalPeriods[Math.floor(Math.random()*rentalPeriods.length)].name,
      generalCancellationPolicy: cancellationPolicyCharge[Math.floor(Math.random()*cancellationPolicyCharge.length)].name,
      lateCancellationPolicyTime: cancellationPolicyTime[Math.floor(Math.random()*cancellationPolicyTime.length)].name,
      lateCancellationPolicyCharge: cancellationPolicyCharge[Math.floor(Math.random()*cancellationPolicyCharge.length)].name,
      customCancellationPolicy: loremIpsum,
      lateReturnPolicy: lateReturnPolicies[Math.floor(Math.random()*lateReturnPolicies.length)].name,
      insuranced: (Math.random()*2) > 1 ? true : false
    }

    console.log('itemId')
    console.log(itemId)

    console.log(updateData) 

    try {
      const result = await axios.patch('/api/items', { updateData, itemId })
    // console.log("********result******")
    // console.log(result)
      console.log('Created:' + i)

    } catch (err){
      console.log(err)
    }     

  }
}