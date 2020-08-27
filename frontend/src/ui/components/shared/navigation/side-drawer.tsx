import React, { FC, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';


interface Props {
  show: boolean;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

const SideDrawer: FC<Props> = ({ show, onClick, children }) => {
  const content = (
    <CSSTransition
      in={show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer" onClick={onClick}>{children}</aside>
    </CSSTransition>
  );
  const drawerHook = document.getElementById("drawer-hook")!;

  return createPortal(content, drawerHook);
}

export default SideDrawer;