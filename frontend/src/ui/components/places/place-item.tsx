import React, { FC, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { Card, Button, Modal, Map } from '../';
import { Place, notify } from '../../../util';
import { useDeletePlace } from '../../../hooks';
import { AuthContext } from '../../../context';


interface Props {
  place: Place;
}

const PlaceItem: FC<Props> = ({ 
  place: { 
    id, title, image,
    address, description, coordinates, creator
  } 
}) => {
  const { isAuthenticated, isAdmin, user } = useContext(AuthContext);
  const [deletePlace] = useDeletePlace(id);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isPlaceDeleted, setPlaceDeleted] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHandler = () => setShowConfirmModal(true);
  const cancelDeleteHandler = () => setShowConfirmModal(false);

  const confirmDeleteHandler = async() => {
    try {
      const ok = await deletePlace();
      if(ok) {
        cancelDeleteHandler();
        notify('Place deleted successfully', 'success', 500);
        setTimeout(() => {
          setPlaceDeleted(true);
        }, 800);
      } else {
        throw new Error('Deleting failed!');
      }
    } catch(error) {
      notify(error.message, 'error', 1000);
      cancelDeleteHandler();
    }
  };

  const isCreator = () => isAuthenticated() && (user?.id === creator.id);
  const canUpdatePlace = () => isCreator();
  const canDeletePlace = () => isCreator() || isAdmin();

  return (
    <>
      {isPlaceDeleted && <Redirect to="/my-places" />}
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
          <Map center={coordinates} zoom={10} />
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
            {canUpdatePlace() && <Button to={`/places/${id}`}>EDIT</Button>}
            {canDeletePlace() && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  )
}

export default PlaceItem;