import React from 'react'

function ButtonMain(props) {

  const variants = {
    blackWhite: 'bg-white text-mainBlack-100 border-2 border-mainBlack-100 hover:bg-gray-100',
    fit: 'w-fit'
  }

  return (
    <button type={props.type} form={props.formId} className={`main-button ${variants[props.variant]} ${props.classNames}`} onClick={props.onSubmit}>{props.children}</button>    

  )
}

export default ButtonMain

