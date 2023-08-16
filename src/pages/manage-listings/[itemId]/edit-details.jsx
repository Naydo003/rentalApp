
import React, { useContext, useState } from 'react'
import ItemCardListings from '@/modules/manage-listings/components/ItemCardListings'
import NavBarManageListings from '@/modules/manage-listings/components/NavbarManageListings'
import { UserContext } from '@/common/contexts/user-context'
import FormDetails from '@/modules/create-item/components/FormDetails'
import CategorySelector from '@/common/components/UIElements/CategorySelector'
import ButtonGeneral from '@/common/ButtonGeneral'


function EditDetails({item}) {

  const [isSelected, setIsSelected] = useState(null)

  let { userRenterId, accountName } = useContext(UserContext)




  return (
    <>
      <NavBarManageListings />
      <main>
        <div className='medium-container flex-1 overflow-auto'>
          <h1>Edit details for {item.name}</h1>

          <h1 className='heading'>Select a category for {item.name}</h1>


          <CategorySelector isSelected={isSelected} setIsSelected={setIsSelected} />
          <h1 className='heading mt-10'>Tell us about this item</h1>

          <FormDetails category={isSelected} nextRoute={`/manage-listings/${item.id}/item-details`} /> 

          <div>
            <ButtonGeneral type='submit' formId='details-form' >Save Changes</ButtonGeneral>
          </div>
            
        </div>
      </main>
    </>
  )
}

export default EditDetails

export async function getServerSideProps(context) {

  console.log("context.params")
  console.log(context.params)

  

  console.log("getting ssP's")
  const item = await prisma.item.findUnique({
    where: {
      id: JSON.parse(context.params.itemId),
    },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      name: true,
      pickUpAddress: true,
      locationCoordinates: true,
      category: true,
      description: true,
      brand: true,
      model: true,
      age: true,
      importantNote: true,
      size: true,
      goodForIndicator: true,
      specialItem: true,
      carMake: true,
      yearOfManufacture: true,
      odometer: true,
      clothingLabel: true,
      bookAuthor: true,
      bookGenre: true,
    }
  })




  return {
    props: {
      item: JSON.parse(JSON.stringify(item))         // this JSON hack is required as the Date Object in mysql cannot be seriealised hence cannot be sent from backend to frontend.
    }
  }
}