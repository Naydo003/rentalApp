import React from 'react'

function ButtonGeneral(props) {
  return (
    <button type={props.type} form={props.formId} className='general-button' onClick={props.onSubmit}>{props.children}</button>
  )
}

export default ButtonGeneral