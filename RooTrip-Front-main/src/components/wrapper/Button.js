import React from 'react';

const Button = ({ type, className, content, ...attr }) => (
  <button type={type || 'button'} className={className} {...attr}>
    {content}
  </button>
);

export default Button;
