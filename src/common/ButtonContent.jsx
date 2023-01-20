import React from 'react'

function ButtonContent({ buttonName, isSelected, onSelectHandler, children, variant }) {


const onClick = () => onSelectHandler(buttonName)

  const variants = {
    detailsCategory: 'min-w-[20%]'
  }

  return (

    <div 
    className={isSelected ? `content-button-selected ${variants[variant]}` : `content-button ${variants[variant]}`} 
    onClick={onClick}>
      {children}


    </div>

  )
}

export default ButtonContent