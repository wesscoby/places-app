import React, { FC } from 'react';


interface Props {
  className?: string;
  style?: any;
}

const Card: FC<Props> = ({
  className, style, children
}) => {
  return (
    <div className={`card ${className}`} style={style}>
      {children}
    </div>
  );
}

export default Card;