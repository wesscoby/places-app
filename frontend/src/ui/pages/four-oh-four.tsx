import React, { FC } from 'react';

import { Button } from '../components';


const FourOhFour: FC = () => {
  return (
    <>
      {[1,2,3,4,5].map((item) => <div key={item} className="bubble" />)}
      <div className="fof-main">
        <h1>404</h1>
        <p>It looks like you're lost...</p>
        <Button danger to="/">GO BACK</Button>
      </div>
    </>
  )
}

export default FourOhFour;