import React, { useReducer, useEffect } from 'react';

import { validate } from '../../utilities/validators';


const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true
      }
    }
    default:
      return state;
  }
};

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isTouched: false,
    isValid: props.initialValid || false
  });

  // const { id, onInput } = props;
  // const { value, isValid } = inputState;

  // useEffect(() => {
  //   onInput(id, value, isValid)
  // }, [id, value, isValid, onInput]);

  const changeHandler = event => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators
    });
    props.formOnChange(event)   
  };

  const touchHandler = (event) => {
    dispatch({
      type: 'TOUCH'
    });
    props.formOnBlur(event)
  };

  const variants = {
    short: 'w-[80px]',
    reducedPadding: 'px-2 py-2'
  }

  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        className={`form-input bg-green-300 ${variants[props.variant]}`}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}              // onBlur is opposite of focus. ie when clicked out of.
        // value={inputState.value}
        name={props.name} 
        ref={props.inputRef}
      />
    ) : (
      <textarea
        id={props.id}
        className='form-input'
        rows={props.rows || 3}
        cols='20'
        onChange={changeHandler}
        onBlur={touchHandler}
        // value={inputState.value}
        name={props.name} 
        ref={props.inputRef}
      />
    );

  return (
    <div
      className={`form-control ${!inputState.isValid && inputState.isTouched &&        // render invalid div if not valid and input has been touched (clicked on then clicked off)
        'form-control--invalid'}`}
    >
      <label className='form-label' htmlFor={props.id}>{props.label}</label>               {/*  htmlFor in jsx is same as for in standard html, keyword for was taken in js    */}
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;