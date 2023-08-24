import NavBarSearch from '@/modules/rentee-booking/NavBarSearch'
import Review from '@/modules/user-profile/components/Review'
import React, { useState } from 'react'

function reviews({user}) {
  const [ reviewsAboutOpen, setReviewsAboutOpen ] = useState(true)

  return (
    <>

    <NavBarSearch />
    <main>
      <div className='large-container flex-1 overflow-auto px:4 sm:px-10'>

      <h1 className='heading'>{user.name}'s Reviews</h1>

      <div className='max-w-[700px]' >
        <nav className='border-b mt-12'>
          <div className={`pb-1 w-fit inline-block ${reviewsAboutOpen && 'border-b-4'}`} >
            <button className={`p-2 hover:bg-gray-100 font-medium secondary-text-sm`} onClick={() => setReviewsAboutOpen(true)} >Reviews about you</button>
          </div>
          <div className={`pb-1 w-fit inline-block ${!reviewsAboutOpen && 'border-b-4'}`} >
            <button className={`p-2 hover:bg-gray-100 font-medium secondary-text-sm`} onClick={() => setReviewsAboutOpen(false)} >Reviews about you</button>
          </div>
        </nav>
          {reviewsAboutOpen && 
            <section>
              <h3 className='subheading mt-12'>Past Reviews</h3>
              <p className='secondary-text-sm mb-8'>Reviews are written at the end of each transaction. Reviews you’ve received will be available both here and on your public profile.</p>

              {user.userRenteeProfile.reviews.map((review) => <Review review={review} key={review.id} />)}
            </section>
          }
          {!reviewsAboutOpen && 
            <>
              <section>
                <h3 className='subheading mt-12'>Reviews to write</h3>
                <p className='secondary-text-sm mb-8'>Nobody to review right now. Looks like it’s time to try something new.</p>
              </section>
              <section>
                <h3 className='subheading mt-12'>Reviews that you have written</h3>
                {user.userRenteeProfile.reviewsWritten.map((review) => <Review review={review} key={review.id} />)}
                
                
              </section>
            </>
          }
      </div>
      
      </div>
    </main>
  </>
  )
}

export default reviews

export async function getServerSideProps(context) {

  console.log("getting ssP's")
  const user = await prisma.account.findUnique({
    where: {
      id: JSON.parse(context.params.userId),
    },
    select: {
      id: true,
      name: true,
      userRenteeProfile: {
        select: {
          isUnrated: true,
          rating: true,
          reviews: {
            select: {
              id: true,
              author: {
                select: {
                  userAccount: {
                    select: {
                      name: true,
                      profilePictureUrl: true
                    }
                  }
                }
              },
              createdAt: true,
              rating: true,
              publicComment: true,
            }
          },
          reviewsWritten: {
            select: {
              id: true,
              item: {
                select: {
                  name: true,
                  itemPhotos: {
                    where: {
                      order: 1
                    },
                    select: {
                      imageUrl: true
                    }
                  },
                }
              },
              itemId: true,
              createdAt: true,
              rating: true,
              publicComment: true,
              privateComment: true,
              reviewDisqualified: true,
            }
          },
        }
      },
      isRenter: true,
      userRenterProfile: true,
      accountBlacklistedOn: true, 
    },
  })

  return {
    props: {
      user: JSON.parse(JSON.stringify(user))         // this JSON hack is required as the Date Object in mysql cannot be seriealised hence cannot be sent from backend to frontend.
    }
  }
}