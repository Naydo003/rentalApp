import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { ItemContext } from '../../../common/contexts/item-context'
import { useReducer } from 'react'
import NavBarCreateItem from '../../../modules/create-item/components/NavBarCreateItem'
import FooterCreateItem from '../../../modules/create-item/components/FooterCreateItem'
import DropZone from '../../../common/components/UIElements/Dropzone'


function AddPhotosPage() {
  let router = useRouter()
  const { itemId, itemName } = useContext(ItemContext)

  const onSubmit = async (updateData) => {
    console.log(updateData)


    try {
      const result = await axios.patch('/api/items', { updateData, itemId })
    console.log("********result******")
    console.log(result)

    router.push(`/create-a-listing/${itemId}/add-location`)

    } catch (err){
      console.log(err)
    }                          
  }

   // reducer function to handle state changes
   const reducer = (state, action) => {
    switch (action.type) {
      case "SET_IN_DROP_ZONE":
        return { ...state, inDropZone: action.inDropZone };
      case "ADD_FILE_TO_LIST":
        return { ...state, fileList: state.fileList.concat(action.files) };
      default:
        return state;
    }
  };

  // destructuring state and dispatch, initializing fileList to empty array
  const [data, dispatch] = useReducer(reducer, {
    inDropZone: false,
    fileList: [],
  });

  const nextButtonHandler = () => {
    router.push(`/create-a-listing/${itemId}/add-pricing-plan`)
  }

  return (
    <div className='h-screen flex flex-col'>
      <NavBarCreateItem />
      <div className='w-full h-fit flex-1 overflow-auto' >
        <div className='medium-container'>
          <h1 className='heading'>Add some pictures</h1>
          <p className='secondary-text'>We suggest a couple of nice ones to start and finish with any highlighting the items condition. Max 8 photo's</p>
          {/* <form id='add-photos-form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>  */}

            {/* <ImageUpload 
              id='image' 
              name={image1.name} 
              onChange={image1.onChange} 
              onBlur={image1.onBlur}
              inputRef={image1.ref} 
              errorText="Please provide an image." 
            /> */}

            <DropZone data={data} dispatch={dispatch} />

          {/* </form> */}

        


        </div>
      </div>
        <FooterCreateItem nextButtonHandler={nextButtonHandler} prevRoute={`/create-a-listing/${itemId}/add-location`}  />
    </div>
  )
}

export default AddPhotosPage

// https://dev.to/hackmamba/image-and-video-upload-to-cloudinary-using-nextjs-server-side-multer-and-xata-database-3l9f