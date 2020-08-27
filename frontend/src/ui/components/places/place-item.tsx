import React, { FC, useState, useContext } from 'react';

import { Card, Button, Modal, Map } from '../';
import { Place } from '../../../util';
import { useDeletePlace } from '../../../hooks';
import { AuthContext } from '../../../context';


interface Props {
  place: Place;
}

const PlaceItem: FC<Props> = ({ 
  place: { 
    id, title, image,
    address, description, location 
  } 
}) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [mutate] = useDeletePlace(id);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHandler = () => setShowConfirmModal(true);
  const cancelDeleteHandler = () => setShowConfirmModal(false);

  const confirmDeleteHandler = () => {
    mutate();
    cancelDeleteHandler();
  };

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

      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        headerClass=""
        contentClass=""
        footerClass="place-item__modal-actions"
        footer={(
          <>
            <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
            <Button danger onClick={confirmDeleteHandler}>CONFIRM</Button>
          </>
        )}
      >
        <p className="center">
          This cannot be undone thereafter. Proceed to delete this place?
        </p>
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
            { isLoggedIn && (
              <>
                <Button to={`/places/${id}`}>EDIT</Button>
                <Button danger onClick={showDeleteWarningHandler}>
                  DELETE
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  )
}

export default PlaceItem;