import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { User } from '../../../util';
import { Avatar, Card } from '..'; 


interface Props {
  placeCount: number;
  user: User;
}

const UserItem: FC<Props> = (
  { user: { id, avatar, name }, placeCount }
) => {

  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${id}/places`}>
          <div className="user-item__image">
            <Avatar image={avatar} alt={`${name}'s profile image`} />
          </div>
          <div className="user-item__info">
            <h2>{name}</h2>
            <h3>{placeCount} {placeCount === 1 ? 'Place' : 'Places'}</h3>
          </div>
        </Link>
      </Card>
    </li>
  )
};

export default UserItem;