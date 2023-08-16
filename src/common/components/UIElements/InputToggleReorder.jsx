import React from 'react'

function InputToggleReorder({initialState, type, symbol, label, onChange,onBlur, name, inputRef, setValue }) {
  const [isChecked, setIsChecked] = useState(initialState)


  return (
    <div className='sm:ml-5 my-4 flex flex-row flex-wrap'>
      <label className='form-label' >{label}</label>
      <Switch 
        className='ml-auto my-auto sm:order-3'
        onChange={() => {
          if (!isChecked) {setValue(name, null)}
          setIsChecked(!isChecked)

        }} 
        checked={isChecked} />
      <div className={isChecked ? 'block basis-full grow sm:basis-48' : 'hidden'}>
        <span className='primary-text sm:text-lg ml-[25%] sm:ml-10'>{symbol}<input className='form-input w-28' type={type} onChange={onChange} onBlur={onBlur} name={name} ref={inputRef} /></span>
      </div>
    </div>
  )
}

export default InputToggleReorder