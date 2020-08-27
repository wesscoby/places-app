import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { MainHeader, NavLinks, SideDrawer } from '.';
import { Backdrop } from '..';


const MainNavigation: FC = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      {isDrawerOpen && <Backdrop onClick={closeDrawer} />}
      {isDrawerOpen && 
        <SideDrawer show={isDrawerOpen} onClick={closeDrawer}>
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
        </SideDrawer>
      }
      <MainHeader>
        <button 
          className="main-navigation__menu-btn"
          onClick={openDrawer}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="main-navigation__title">
          <Link to='/'>
            <div>
              <img src="/logo192.png" alt="Places Logo" />
              <h3>Places</h3>
            </div>
          </Link>
        </div>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
}

export default MainNavigation;