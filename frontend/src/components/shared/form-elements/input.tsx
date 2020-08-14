import React, { FC } from 'react';
import { Field, ErrorMessage } from 'formik';

import { onBlurEvent, onChangeEvent } from '../../../util';


type InputType = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'reset' | 'search' | 'submit' | 'week' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'tel' | 'text' | 'url';

interface Props {
  name: string;
  label: string;
  textarea?: boolean;
  type?: InputType;
  placeholder?: string;
  rows?: number;
  style?: any;
  className?: string;
  errorText?: string;
  onBlur?: onBlurEvent;
  onChange?: onChangeEvent;
}

const Input: FC<Props> = ({
  name, label, placeholder = '', type = 'text', textarea = false,
  rows = 3, style = {}, className = '', errorText
}) => {
  const element = textarea ? (
    <Field 
      id={name} 
      name={name} 
      placeholder={placeholder} 
      component="textarea"
      rows={rows}
    />
  ) : (
    <Field 
      id={name} 
      name={name}
      type={type} 
      placeholder={placeholder}  
    />
  );

  return (
    <div 
      className={`form-control ${className} ${errorText && 'form-control--invalid'}`} 
      style={style}
    >
      <label htmlFor={name}>{label}</label>
      {element}
      <ErrorMessage name={name} component="p" />
    </div>
  );
}

export default Input;