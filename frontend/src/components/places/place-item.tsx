import React, { FC, useState } from 'react';

import { Card, Button, Modal, Map } from '../';
import { Place } from '../../util';


interface Props {
  place: Place;
}

const PlaceItem: FC<Props> = ({ 
  place: { 
    id, title, image,
    address, description, location 
  } 
}) => {
  const [showMap, setShowMap] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  return (
    <>
      <Modal 
        show={showMap} 
        onCancel={closeMapHandler} 
        header={address}
        headerClass=""
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={(
          <Button onClick={closeMapHandler}>CLOSE</Button>
        )}
      >
        <div className="map-container">
          <Map center={location} zoom={10} />
        </div>
      </Modal>

      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={image} alt={title} />
          </div>
          <div className="place-item__info">
            <h2>{title}</h2>
            <h4>{address}</h4>
            <p>{description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
            <Button to={`/places/${id}`}>EDIT</Button>
            <Button danger>DELETE</Button>
          </div>
        </Card>
      </li>
    </>
  )
}

export default PlaceItem;