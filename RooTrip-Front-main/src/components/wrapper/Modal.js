import React from 'react';
import ReactDOM from 'react-dom';

import '@styles/components/modal.scss';

const Backdrop = ({ background, onClose }) => (
  <div className={`backdrop ${background}`} onClick={onClose} />
);

const ModalOverlay = ({ className, children }) => (
  <div className={`modal ${className}`}>{children}</div>
);

const portalElement = document.getElementById('overlays');

const Modal = ({ background, className, onClose, children }) => (
  <>
    {ReactDOM.createPortal(
      <Backdrop background={background} onClose={onClose} />,
      portalElement,
    )}
    {ReactDOM.createPortal(
      <ModalOverlay className={className}>{children}</ModalOverlay>,
      portalElement,
    )}
  </>
);

export default Modal;
