import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useReducer } from 'react'
import NavBarCreateItem from '../../../modules/create-item/components/NavBarCreateItem'
import FooterCreateItem from '../../../modules/create-item/components/FooterCreateItem'
import ImageUpload from '../../../common/components/UIElements/ImageUpload'
import DropZone from '../../../common/components/UIElements/Dropzone'
import axios from 'axios'


function AddPhotosPage() {
  const [img, setImg] = useState(null)

  const handleFileSelect = (e) => {
    setImg(e.target.files[0])
  }

  const uploadImage = async () => {
    const formData = new FormData()
    formData.append("image", img)
    // const response = await axios.patch('/api/fuck', { formData })
        const response = await fetch("/api/fuck", {
      method: "PATCH",
      body: formData,
    });
  }


  return (
    <div className='h-screen flex flex-col'>
      <NavBarCreateItem />
      <div className='w-full h-fit flex-1 overflow-auto' >
        <div className='small-container'>
          <h1 className='heading'>Add some pictures</h1>
          <p className='secondary-text'>We suggest a couple of nice ones to start and finish with any highlighting the items condition. Max 8 photo's</p>

          <input
          id="fileSelect"
          type="file"
          multiple
          className=''
          onChange={(e) => handleFileSelect(e)}
          />

          <button onClick={uploadImage}>Upload</button>

        


        </div>
      </div>
    </div>
  )
}

export default AddPhotosPage