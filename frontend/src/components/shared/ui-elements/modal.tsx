import React, { FC, FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import { Backdrop } from '..';
import { OnClickEvent } from '../../../util';


interface ModalOverlayProps {
  style?: any;
  className?: string;
  headerClass: string;
  contentClass: string;
  footerClass: string;
  header: string;
  footer: any;  // temp type
  onSubmit?: (e: FormEvent) => void
}

interface ModalProps extends ModalOverlayProps {
  show: boolean;
  onCancel?: OnClickEvent;
}

const ModalOveralay: FC<ModalOverlayProps> = ({
  style = {}, className, headerClass, header, footer,
  onSubmit, contentClass, footerClass, children
}) => {
  const content = (
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
  );
  const modalHook = document.getElementById('modal-hook')!;

  return createPortal(content, modalHook);
}


const Modal: FC<ModalProps> = ({ 
  show, onCancel, ...props
}) => {
  return (
    <>
      {show && <Backdrop onClick={onCancel} />}
      <CSSTransition 
        in={show} mountOnEnter unmountOnExit
        timeout={200} classNames="modal"
      >
        <ModalOveralay {...props} />
      </CSSTransition>
    </>
  )
}

export default Modal;