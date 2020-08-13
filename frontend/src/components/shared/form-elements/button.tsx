import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { OnClickEvent } from '../../../util';


interface Props {
  onClick?: OnClickEvent;
  href?: string;
  to?: string;
  size?: number;
  inverse?: boolean;
  danger?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button: FC<Props> = ({
  onClick, href, to, size, 
  inverse = false, danger = false,
  type, disabled = false,
  children
}) => {
  if (href) {
    return (
      <a
        className={`button button--${size || 'default'} ${inverse &&
          'button--inverse'} ${danger && 'button--danger'}`}
        href={href}
      >
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link
        to={to}
        className={`button button--${size || 'default'} ${inverse &&
          'button--inverse'} ${danger && 'button--danger'}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`button button--${size || 'default'} ${inverse &&
        'button--inverse'} ${danger && 'button--danger'}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;