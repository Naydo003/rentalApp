import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import axios from "axios"
import NewItemForm from '../../modules/create-item/components/NewItemForm'
import NavBarCreateItem from '../../modules/create-item/components/NavBarCreateItem'
import FooterCreateItem from '../../modules/create-item/components/FooterCreateItem'
import { seed } from '@/common/utilities/db-seeder'
import { UserContext } from '@/common/contexts/user-context'

// We could use local styles here if need
// import styles from '../../../styles/create-item.module.css'
// would need to use className={styles.mediumContainer}

function CreateAListing() {

  const { userRenterId, accountId } = useContext(UserContext)

  return (

      <div className='h-screen flex flex-col'>
        <NavBarCreateItem />
        <div className='small-container flex-1 overflow-auto'>
          <h1 className='heading'>Become A Renter</h1>
          <NewItemForm />
          <button onClick={() => seed(10, userRenterId, accountId)} >Seed DataBase 10</button>
        </div>
        <FooterCreateItem formId='new-item-form' prevRoute={`/`}  />
      </div>
  )
}

export default CreateAListing