import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import FilePreview from "./FilePreview";
import UploadIcon from '../../../../public/upload.svg'

const DropZone = ({ data, dispatch }) => {
  const itemId = 5


  // onDragEnter sets inDropZone to true
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };


  // onDragLeave sets inDropZone to false
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
  };

  // onDragOver sets inDropZone to true
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // set dropEffect to copy i.e copy of the source item
    e.dataTransfer.dropEffect = "copy";
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

   // onDrop sets inDropZone to false and adds files to fileList
   const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // get files from event on the dataTransfer object as an array
    let files = [...e.dataTransfer.files];

    console.log("files")
    console.log(files)

    // ensure a file or files are dropped
    if (files && files.length > 0) {
      // loop over existing files
      const existingFiles = data.fileList.map((f) => f.name);
      // check if file already exists, if so, don't add to fileList
      // this is to prevent duplicates
      files = files.filter((f) => !existingFiles.includes(f.name));

      // create a url and order number for temporary file and add this to the file object
      let url = window.URL.createObjectURL(files[0])
      files[0].previewUrl = url
      files[0].order = existingFiles.length + 1

      // dispatch action to add droped file or files to fileList
      dispatch({ type: "ADD_FILE_TO_LIST", files });
      // reset inDropZone to false
      dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
    }
  };

  // handle file selection via input element
  const handleFileSelect = (e) => {
    // get files from event on the input element as an array
    let files = [...e.target.files];


    // ensure a file or files are selected
    if (files && files.length > 0) {
      // loop over existing files
      const existingFiles = data.fileList.map((f) => f.name);
      // check if file already exists, if so, don't add to fileList
      // this is to prevent duplicates
      files = files.filter((f) => !existingFiles.includes(f.name));

      let url = window.URL.createObjectURL(files[0])
      files[0].previewUrl = url
      files[0].order = existingFiles.length + 1

      // dispatch action to add selected file or files to fileList
      dispatch({ type: "ADD_FILE_TO_LIST", files });
    }
    console.log("fileList")

    console.log(data.fileList)
  };

  // to handle file uploads
  const uploadFiles = async () => {
    // get the files from the fileList as an array
    let files = data.fileList;
    // initialize formData object
    const updateData = new FormData();
    updateData.append('itemId', itemId)
    // updateData.append("image", img)
    // loop over files and add to formData
    files.forEach((file) => {
      console.log(file)
      updateData.append('images', file)
    });
    
    for (var key of updateData.entries()) {
      console.log('wierd thing')
      console.log(key[0] + ', ' + key[1]);
  }
    console.log('update Data')
    console.log(updateData)

    // Upload the files as a POST request to the server using axios
    // const response = await axios.patch('/api/items', { formData })
    const response = await fetch("/api/item-images", {
      method: "POST",
      body: updateData,
    });

    //successful file upload
    if (response.ok) {
      alert("Files uploaded successfully");
    } else {
      // unsuccessful file upload
      alert("Error uploading files");
    }
  };


  return (
    <>
      <div
        className='w-full h-60 sm:h-100 md:h-150 border-4 border-maingrey-100 my-5 flex flex-col items-center justify-center'
        onDragEnter={(e) => handleDragEnter(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragLeave={(e) => handleDragLeave(e)}
        onDrop={(e) => handleDrop(e)}
      >
        <UploadIcon height={50} width={50} />
        <label className='heading cursor-pointer' htmlFor="fileSelect">
          Click here to Select Files
          <input
          id="fileSelect"
          type="file"
          multiple
          className='hidden'
          onChange={(e) => handleFileSelect(e)}
          />
        
        </label>
        <h3 className='' >
          or drag &amp; drop your files here
        </h3>
      </div>
      {/* Pass the selectect or dropped files as props */}
      
      <FilePreview fileData={data} />

      {data.fileList.length > 0 && (
        <button className='secondary-button' onClick={uploadFiles}>
          Upload
        </button>
      )}
    </>
  );
};

export default DropZone;