import React, { FC } from 'react';

import { UserItem } from '.';
import { Card } from '..'
import { User } from '../../util';

interface Props {
  items: User[];
}

const UsersList: FC<Props> = ({ items }) => {
  if(items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    )
  }

  return (
    <ul className="users-list">
      {
        items.map(user => (
          <UserItem 
            key={user.id} 
            user={user} 
            placeCount={user.places.length} 
          />
        ))
      }
    </ul>
  )

};

export default UsersList;