import React, { FC, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { ScaleLoader } from 'react-spinners';
import { Redirect } from 'react-router-dom';

import { Input, Button, Card, Spinner } from '../../components';
import { AuthContext } from '../../../context';
import { updatePlaceSchema, notify } from '../../../util';
import { useFetchPlaceById, useUpdatePlace } from '../../../hooks';


interface ParamTypes {
  pid: string
}

interface UpdatePlaceSchema {
  title: string;
  description: string;
}

const UpdatePlace: FC = () => {
  const { user } = useContext(AuthContext);
  const { pid } = useParams<ParamTypes>();
  const { error, isLoading, data } = useFetchPlaceById(pid);
  const [isPlaceUpdated, setPlaceUpdated] = useState(false);
  const [updatePlace] = useUpdatePlace(pid);

  if(isLoading) return <Spinner asOverlay />;
  if(error) return <p>Error! {error?.message}</p>;
  
  if(!data) return (
    <div className="center">
      <Card>
        <h2>Place not found</h2>
      </Card>
    </div>
  );

  const schemaValues: UpdatePlaceSchema = {
    title: data.title,
    description: data.description
  }

  return (
    <>
      {isPlaceUpdated && <Redirect to={`/${user!.id}/places`} />}
      <div className="place-form">
        <Formik
          initialValues={schemaValues}
          validationSchema={updatePlaceSchema}
          onSubmit={(
            { title, description }: UpdatePlaceSchema,
            { setSubmitting }
          ) => {
            try {
              if(
                title === data.title && description === data.description
              ) throw new Error('Nothing changed!');
              setSubmitting(true);
              const updatedPlace = updatePlace({ title, description });
              if(updatedPlace) {
                notify('Updated successful', 'success', 500);
                setSubmitting(false);
                setTimeout(() => {
                  setPlaceUpdated(true);
                }, 800);
              } else {
                throw new Error('Updating failed. try again!');
              }
            } catch(error) {
              notify(error.message, 'error', 1000);
              setSubmitting(false);
            }
          }}
        >
          {({
            isSubmitting, errors, values: { title }, isValid
          }) => (
            <Form>
              <Input
                label="Title"
                name="title"
                placeholder="Enter title"
                errorText={errors.title}
              />
              <Input
                textarea
                label="Description"
                name="description"
                placeholder={`Provide some information about ${title ? title : 'this place'}`}
                errorText={errors.description}
              />
              {isSubmitting ? <ScaleLoader color="#ff0055" /> : (
                <Button type="submit" disabled={!isValid}>
                  UPDATE PLACE
                </Button>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default UpdatePlace;