import React, { useState } from 'react'
import Switch from "react-switch";


function InputToggle({initialState, type, label, onChange, onBlur, name, inputRef, setValue, boolName }) {
  const [isChecked1, setIsChecked1] = useState(initialState)



  return (
      <div className='sm:ml-5 my-4 flex flex-row'>
        <label className='form-label shrink' htmlFor={name} >{label}</label>
        <div className={isChecked1 ? 'block basis-[180px] grow' : 'hidden'}>
          <span className='primary-text sm:text-lg ml-2 sm:ml-10'>$<input className='form-input w-28' type={type} onChange={onChange} onBlur={onBlur} name={name} ref={inputRef} /></span>
        </div>
        <Switch 
          className='ml-2 sm:ml-5 my-auto'
          onChange={() => {
            if (isChecked1) {
              setValue(name, 0.00)
            }
            setIsChecked1(!isChecked1)
            setValue(boolName, !isChecked1)
          }} 
          checked={isChecked1} />
      </div>
  )
}

export default InputToggle