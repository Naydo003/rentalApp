import React from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import axios from "axios"
import NewItemForm from '../../modules/components/create-item-forms/NewItemForm'
import NavBarCreateItem from '../../modules/components/NavBarCreateItem'
import FooterCreateItem from '../../modules/components/create-item-forms/FooterCreateItem'

// We could use local styles here if need
// import styles from '../../../styles/create-item.module.css'
// would need to use className={styles.mediumContainer}

function CreateAListing() {

  let router = useRouter()
  const userRenterId = 5

  const nextButtonHandler = () => {
    console.log('launch axios request then redirect to ...')

    router.push(`/create-a-listing/${itemId}/overview`)

  }


   


  return (

    <div className='h-screen flex flex-col'>
      <NavBarCreateItem />
      <div className='medium-container flex-1 overflow-auto'>
        <h1 className='heading'>Become A Renter</h1>

        <NewItemForm />

      </div>
      <FooterCreateItem nextButtonHandler={nextButtonHandler} prevRoute={`/`}  />

    </div>
  )
}

export default CreateAListing