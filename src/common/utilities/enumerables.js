function titleMapBuilder(list) {
  let titleKeyObjectBuilder = {}
  list.forEach(entry => {
  titleKeyObjectBuilder[entry.name] = entry.title
  })
  return titleKeyObjectBuilder
}

function checkboxInitialStateBuilder(list) {
  let objectBuilder = {}
  list.forEach(entry => (objectBuilder[entry.name] = false) ) 
  return objectBuilder
}



export const categories = [
  { name: 'kitchenAppliance', title: 'Kitchen Appliance'},
  { name: 'toolsDIY', title: 'Tools/DIY'},
  { name: 'gardening', title: 'Gardening'},
  { name: 'games', title: 'Games'},
  { name: 'sportsEquipment', title: 'Sports Equipment'},
  { name: 'waterSports', title: 'Water Sports'},
  { name: 'book', title: 'Book'},
  { name: 'artsCrafts', title: 'Arts and Crafts'},
  { name: 'clothing', title: 'Clothing'},
  { name: 'outdoor', title: 'Outdoor'},
  { name: 'camping', title: 'Camping'},
  { name: 'bikes', title: 'Bikes'},
  { name: 'car', title: 'Car'},
  { name: 'boats', title: 'Boats/Jetski'},
  { name: 'electronics', title: 'Electronics'},
  { name: 'hobby', title: 'Hobby'},
  { name: 'other', title: 'Other'}
]

export const categoriesTitleMap = titleMapBuilder(categories)

export const goodForIndicator = [
  { name: 'kids', title: 'Kids' },
  { name: 'teenagers', title: 'Teenagers' },
  { name: 'adults', title: 'Adults' },
  { name: 'couples', title: 'Couples' },
  { name: 'families', title: 'Families' },
  { name: 'groups', title: 'Groups' },
  { name: 'holiday', title: 'Holiday' },
  { name: 'anAfternoon', title: 'Afternoons' },
  { name: 'aWeekend', title: 'A Weekend' },
  { name: 'tightBudget', title: 'A Tight Budget' },
  { name: 'tasteOfLuxury', title: 'A Taste of Luxury' }
]

export const goofForIndicatorTitleMap = titleMapBuilder(goodForIndicator)

export const specialItem = [
  { name: 'car', title: 'Car' },
  { name: 'clothing', title: 'Clothing' },
  { name: 'book', title: 'Book' },
  { name: 'property', title: 'Property' }
]

export const specialItemTitleMap = titleMapBuilder(specialItem)

export const condition = [
  { name: 'asGoodAsNew', title: 'As Good as New' },
  { name: 'aFewScuffs', title: 'A Few Scuffs' },
  { name: 'heavilyUsed', title: 'Heavily Used' },
  { name: 'oldAndTemperamental', title: 'Old and Temperamental' }
]

export const conditionTitleMap = titleMapBuilder(condition)

export const rentalPeriods = [
  { name: 'none', title: 'No' },
  { name: 'min1hour', title: '1 Hour' },
  { name: 'min2hours', title: '2 Hours' },
  { name: 'min3hours', title: '3 Hours' },
  { name: 'min4hours', title: '4 Hours' },
  { name: 'min5hours', title: '5 Hours' },
  { name: 'min6hours', title: '6 Hours' },
  { name: 'min7hours', title: '7 Hours' },
  { name: 'min8hours', title: '8 Hours' },
  { name: 'min9hours', title: '9 Hours' },
  { name: 'min10hours', title: '10 Hours' },
  { name: 'min11hours', title: '11 Hours' },
  { name: 'min12hours', title: '12 Hours' },
  { name: 'min1day', title: '1 Day' },
  { name: 'min2days', title: '2 Days' },
  { name: 'min3days', title: '3 Days' },
  { name: 'min4days', title: '4 Days' },
  { name: 'min5days', title: '5 Days' },
  { name: 'min6days', title: '6 Days' },
  { name: 'min7days', title: '7 Days' },
  { name: 'min8days', title: '8 Days' },
  { name: 'min9days', title: '9 Days' },
  { name: 'min10days', title: '10 Days' },
  { name: 'min11days', title: '11 Days' },
  { name: 'min12week', title: '12 Days' },
  { name: 'min13days', title: '13 Days' },
  { name: 'min2weeks', title: '2 weeks' },
  { name: 'min3weeks', title: '3 weeks' },
  { name: 'min4weeks', title: '4 weeks' }
]

export const rentalPeriodsTitleMap = titleMapBuilder(rentalPeriods)



export const cancellationPolicyCharge = [
  { name: 'free', title: 'Free', description: 'Only applies to cancellations within 24 hours of pickup date'},
  { name: 'percent10', title: '10%', description: 'Applies to any cancellation effective imediately after booking and booking buffer has expired'},
  { name: 'percent25', title: '25%', description: 'Only applies to cancellations within 2 weeks of pickup date'},
  { name: 'percent50', title: '50%', description: 'Only applies to cancellations within 1 week of pickup date'},
  { name: 'percent100', title: '100%', description: 'Only applies to cancellations within 48 hours of pickup date'},
  { name: 'customPolicy', title: 'Custom Policy' }
]


export const cancellationPolicyChargeTitleMap = titleMapBuilder(cancellationPolicyCharge)


export const cancellationPolicyTime = [
  { name: 'weeks2', title: '2 weeks', description: 'Only applies to cancellations within 2 weeks of pickup date'},
  { name: 'weeks1', title: '1 week', description: 'Only applies to cancellations within 1 week of pickup date'},
  { name: 'hours48', title: '48 hours', description: 'Only applies to cancellations within 48 hours of pickup date'},
  { name: 'hours24', title: '24 hours', description: 'Only applies to cancellations within 24 hours of pickup date'},
  { name: 'customPolicy', title: 'Custom Policy' },
  { name: 'none', title: 'None' }
]



export const cancellationPolicyTimeTitleMap = titleMapBuilder(cancellationPolicyTime)


export const lateReturnPolicies = [
  {name: 'chargeForEachAdditionalHour', title: 'Per hour', description: 'Charge the customer for each additional hour past the expected return time.'},
  {name: 'chargeForEachAdditionalDay', title: 'Per day', description: 'Charge the customer for an additional day if it is not returned on time. Only possible under certain conditions, see Notes.'},
  {name: 'chargeForEachAdditionalHourPlus15', title: 'Per hour + 15%', description: 'Charge the customer for each additional hour if past the expected return time plus a 15% penalty on top of the hourly rate. Only recommended for businesses'},
  {name: 'chargeForEachAdditionalDayPlus15', title: 'Per day + 15%', description: 'Charge the customer for each additional day if past the expected return time plus a 15% penalty on top of the day rate. Only possible under certain conditions, see Notes. Only recommended for businesses'},
  {name: 'chargeForEachAdditionalHourPlus25', title: 'Per hour + 25%', description: 'Charge the customer for each additional hour if past the expected return time plus a 25% penalty on top of the hourly rate. Only recommended for businesses'},
  {name: 'chargeForEachAdditionalDayPlus25', title: 'Per day + 25%', description: 'Charge the customer for each additional day if past the expected return time plus a 25% penalty on top of the day rate. Only possible under certain conditions, see Notes. Only recommended for businesses'},
  {name: 'customPolicy', title: 'Custom Policy', description: 'Detail your own policy in the details section and manage any late returns via your own contracts. Dispute resolution handled via claims process'}
]



export const lateReturnPolicyTitleMap = titleMapBuilder(lateReturnPolicies)


export const timeframe = [
  { name: 'none', title: 'None Selected' },
  { name: 'min1hour', title: '1 Hour' },
  { name: 'min2hours', title: '2 Hours' },
  { name: 'min3hours', title: '3 Hours' },
  { name: 'min4hours', title: '4 Hours' },
  { name: 'min5hours', title: '5 Hours' },
  { name: 'min6hours', title: '6 Hours' },
  { name: 'min7hours', title: '7 Hours' },
  { name: 'min8hours', title: '8 Hours' },
  { name: 'min9hours', title: '9 Hours' },
  { name: 'min10hours', title: '10 Hours' },
  { name: 'min11hours', title: '11 Hours' },
  { name: 'min12hours', title: '12 Hours' },
  { name: 'min1day', title: '1 Day' },
  { name: 'min2days', title: '2 Days' },
  { name: 'min3days', title: '3 Days' },
  { name: 'min4days', title: '4 Days' },
  { name: 'min5days', title: '5 Days' },
  { name: 'min6days', title: '6 Days' },
  { name: 'min7days', title: '7 Days' },
  { name: 'min8days', title: '8 Days' },
  { name: 'min9days', title: '9 Days' },
  { name: 'min10days', title: '10 Days' },
  { name: 'min11days', title: '11 Days' },
  { name: 'min12week', title: '12 Days' },
  { name: 'min13days', title: '13 Days' },
  { name: 'min2weeks', title: '2 weeks' },
  { name: 'min3weeks', title: '3 weeks' },
  { name: 'min4weeks', title: '4 weeks' }
]

export const timeframeTitleMap = titleMapBuilder(timeframe)




export const bookingDurationMilliSecondMap = {
  hour1: 60*60*1000,
  hours2: 2*60*60*1000,
  hours3: 3*60*60*1000,
  hours4: 4*60*60*1000,
  hours5: 5*60*60*1000,
  hours6: 6*60*60*1000,
  hours7: 7*60*60*1000,
  hours8: 8*60*60*1000,
  hours10: 10*60*60*1000,
  hours12: 12*60*60*1000,
  day1: 1*24*60*60*1000,
  day2: 2*24*60*60*1000,
  day3: 3*24*60*60*1000,
  day4: 4*24*60*60*1000,
  day5: 5*24*60*60*1000,
  day6: 6*24*60*60*1000,
  day7: 7*24*60*60*1000,
  day8: 8*24*60*60*1000,
  day9: 9*24*60*60*1000,
  day10: 10*24*60*60*1000,
  day11: 11*24*60*60*1000,
  day12: 12*24*60*60*1000,
  day13: 13*24*60*60*1000,
  weeks2: 2*7*24*60*60*1000,
  weeks3: 3*7*24*60*60*1000,
  weeks4: 4*7*24*60*60*1000,

}