import React from 'react'

function ButtonGeneral(props) {
  return (
    <div className='general-button' onClick={props.onSubmit}>{props.children}</div>
  )
}

export default ButtonGeneral