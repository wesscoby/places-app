import React, { FC, FormEvent } from 'react';
import ReactModal from 'react-modal';

import { OnClickEvent } from '../../../../util';


interface ModalProps {
  show: boolean;
  onCancel?: OnClickEvent;
  style?: any;
  className?: string;
  headerClass: string;
  contentClass: string;
  footerClass: string;
  header: string;
  footer: any;
  onSubmit?: (e: FormEvent) => void
}

const Modal: FC<ModalProps> = ({
  onCancel, onSubmit, show, children, className, style={}, headerClass, header,
  contentClass, footer, footerClass
}) => {
  ReactModal.setAppElement('#modal-hook');

  return (
    <ReactModal
      isOpen={show}
      className="modal"
      overlayClassName="backdrop"
      onRequestClose={onCancel}
      contentLabel="Modal"
    >
      <div className={`modal ${className ? className : ''} `} style={style}>
        <header className={`modal__header ${headerClass}`}>
          <h2>{header}</h2>
        </header>
        <form onSubmit={onSubmit ? onSubmit : e => e.preventDefault()}>
          <div className={`modal__content ${contentClass}`}>
            {children}
          </div>
          <footer className={`modal__footer ${footerClass}`}>
            {footer}
          </footer>
        </form>
      </div>
    </ReactModal>
  )
}

export default Modal;