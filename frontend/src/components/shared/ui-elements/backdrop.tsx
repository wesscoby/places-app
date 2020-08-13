import React, { FC, MouseEvent } from 'react';
import { createPortal } from 'react-dom';


interface Props {
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

const Backdrop: FC<Props> = ({ onClick }) => {
  const content = <div className="backdrop" onClick={onClick} />
  const backdropHook = document.getElementById('backdrop-hook')!

  return createPortal(content, backdropHook);
}

export default Backdrop;