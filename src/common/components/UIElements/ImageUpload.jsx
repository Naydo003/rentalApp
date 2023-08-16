import React, { useRef, useState } from 'react';
import ButtonGeneral from '../../ButtonGeneral';

const ImageUpload = props => {
  const [previewUrl, setPreviewUrl] = useState()
  const [isValid, setIsValid] = useState(false)


  const filePickerRef = useRef();       // builds ref link to input element


  const pickedHandler = event => {
    let pickedFile
    let fileIsValid
    if (event.target.files && event.target.files.length === 1 ) {         // we only want to support upload of one file at a time
      pickedFile = event.target.files[0]

      setPreviewUrl(window.URL.createObjectURL(pickedFile));
      setIsValid(true)
      fileIsValid = true
    } else {
      setIsValid(false)
      fileIsValid = false
    }
  };

  const pickImageHandler = () => {      // Basically we want to use <input type=file > functionality but not display it. When pick image button clicked we will open the filepickerRef ie <Input
    console.log('pickimagehandler running')
    filePickerRef.current.click();
  };

  return (
    <div className="block w-[100%]">
      <input
        className=""
        id={props.id}
        ref={filePickerRef}
        type="file"
        accept=".jpg,.png,.jpeg"             
        onChange={pickedHandler}
      />
      <div className={`${props.center && 'justify-center'}`}>         {/*    className = "image upload and if center is passed as a prop it will add center to className    */}
        <div className="w-60 h-60">
          {previewUrl && <img className='w-full h-full' src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <ButtonGeneral className='' onSubmit={pickImageHandler}>PICK IMAGE</ButtonGeneral> 
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;

// need to change onSubmit