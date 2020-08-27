import React, { FC } from 'react';


interface Props {
  image: string;
  alt?: string;
  className?: string;
  style?: any;
  width?: number;
}

const Avatar: FC<Props> = ({ 
  className = "", image, alt = ""
}) => {
  return (
    <div className={`avatar ${className}`}>
      <img
        src={image}
        alt={alt}
        // style={{ width: width, height: width }}
      />
    </div>
  );
};

export default Avatar;