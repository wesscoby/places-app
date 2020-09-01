import React, { FC } from 'react';

import { Button } from '../';


interface Props {
  error: Error;
}

const Error: FC<Props> = ({ error }) => {
  return (
    <>
      {[1,2,3,4,5].map((item) => <div key={item} className="bubble" />)}
      <div className="fof-main">
        <h1>{error.name}</h1>
        <p>{error.message}</p>
        <Button danger to="/">GO BACK</Button>
      </div>
    </>
  )
}

export default Error;