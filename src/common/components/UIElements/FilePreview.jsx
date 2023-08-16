import React, { useState } from "react";

const FilePreview = ({ fileData }) => {
  // const [previewUrl, setPreviewUrl] = useState()

  return (
    <div className='mb-5' >
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4' >

        {!fileData.fileList.length && <p>Please pick an image.</p>}
        {/* loop over the fileData */}
        {fileData.fileList.map((f, index) => {
          // console.log(f)
          // setPreviewUrl(window.URL.createObjectURL(f));

          return (
            <div key={index}>
              <ol key={index}>
                <li key={index} className='' >
                  {/* display the filename and type */}
                  <div key={f.lastModified} className='h-fit' >
                    <div className='h-80' >
                      {f.previewUrl && <img className='w-full h-full' src={f.previewUrl} alt="Preview" />}
                    </div>
                    {f.name}
                  </div>
                </li>
              </ol>
            </div>
          );
        })}
      </div>
    </div>
  );

};

export default FilePreview;