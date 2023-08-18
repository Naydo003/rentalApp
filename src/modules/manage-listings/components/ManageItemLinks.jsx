import { ItemContext } from '@/common/contexts/item-context'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

function ManageItemLinks() {
  const { itemId } = useContext(ItemContext)

  const { asPath } = useRouter()


  const notSelectedClassNames = 'block w-full h-full text-center py-1 border border-gray-400 rounded-t-md hover:bg-gray-200'
  const isSelectedClassNames = 'block w-full h-full text-center py-1 border border-gray-400 rounded-t-md bg-gray-200'
  


  return (
    <div className='grid grid-cols-2 sm:grid-cols-4 h-fit'>
    
      <Link className={asPath.includes('item-details') ? isSelectedClassNames : notSelectedClassNames} href={`/manage-listings/${itemId}/item-details`} >Item Details</Link>
      
      <Link className={asPath.includes('calendar') ? isSelectedClassNames : notSelectedClassNames} href={`/manage-listings/${itemId}/calendar`} >Calendar</Link>
      
      <Link className={asPath.includes('maintenance') ? isSelectedClassNames : notSelectedClassNames} href={`/manage-listings/${itemId}/maintenance`} >Maintenance</Link>
      
      <Link className={asPath.includes('activity-report') ? isSelectedClassNames : notSelectedClassNames} href={`/manage-listings/${itemId}/activity-report`} >Activity Report</Link>
      
    </div>
  )
}

export default ManageItemLinks