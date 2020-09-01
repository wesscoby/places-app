import React, { FC } from 'react';


interface Props {
  asOverlay: boolean;
}

const Spinner: FC<Props> = ({ asOverlay = false }) => {
  return (
    <div className={`${asOverlay && 'loading-spinner__overlay'}`}>
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default Spinner;