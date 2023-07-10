import React from 'react';

const Input = ({ type, className, children, ...attr }) => (
  <>
    <input type={type || 'text'} className={className} {...attr} />
    {children}
  </>
);

export default Input;
