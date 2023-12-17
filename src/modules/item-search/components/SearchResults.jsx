import { useRouter } from 'next/router'
import React from 'react'
import ItemCard from './ItemCard'

function SearchResults({items}) {
  const router = useRouter()

  console.log(items)

  const resultCount = items.length || 0

  const sortHandler = (e) => {
    const sort = e.target.value
    router.query.sort = sort
    
    console.log('router.query')
    console.log(router.query)
    router.push(
      {
        pathname: '/search',
        query: router.query,
    })
  }
  return (
    <>
      <div className='border border-red-500 w-full flex flex-row justify-between mb-4'>
        {resultCount === 0 ? <p className='inline-block'>No results</p> : <p className='inline-block'>{resultCount + ' '} Results</p>}
        <div>
          <label htmlFor='sort'>Sort By:</label>
          <select id='sort' onChange={sortHandler}>
            <option>Featured</option>
            <option>Available Now</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>By City</option>

          </select>
        </div>
      </div>
      <div className=' border w-full max-w-[1400px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {items.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </>
  )
}

export default SearchResults
