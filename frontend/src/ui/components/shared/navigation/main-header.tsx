import React, { FC } from 'react';


const MainHeader: FC = ({ children }) => {
  return (
    <header className="main-header">
      {children}
    </header>
  );
}

export default MainHeader;