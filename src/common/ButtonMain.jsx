import React from 'react'

function ButtonMain(props) {

  return (
    <button type={props.type} form={props.formId} className='main-button' onClick={props.onSubmit}>{props.children}</button>    

  )
}

export default ButtonMain

