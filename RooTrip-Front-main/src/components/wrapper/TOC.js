import React from 'react';

import '@styles/components/toc.scss';

const TOC = ({ table }) => (
  <div className='register-table'>
    {table.map((content) => (
      <span key={content.id} className={content.classname}>
        {content.name}
      </span>
    ))}
  </div>
);

export default TOC;
