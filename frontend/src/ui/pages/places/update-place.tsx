import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';

import { Input, Button, Card } from '../../components';
import { updatePlaceSchema } from '../../../util';
import { useFetchPlaceById, useUpdatePlace } from '../../../hooks';


interface ParamTypes {
  pid: string
}

interface UpdatePlaceSchema {
  title: string;
  description: string;
}

const UpdatePlace: FC = () => {
  const { pid } = useParams<ParamTypes>();
  const { error, isLoading, data } = useFetchPlaceById(pid);
  const [mutate] = useUpdatePlace(pid);

  if(isLoading) return <p>Loading...</p>;
  if(error) return <p>Error! {error?.message}</p>;
  
  if(!data) return (
    <div className="center">
      <Card>
        <h2>Place not found</h2>
      </Card>
    </div>
  );

  const schemaValues: UpdatePlaceSchema = {
    title: data.place.title,
    description: data.place.description
  }

  return (
    <div className="place-form">
      <Formik
        initialValues={schemaValues}
        validationSchema={updatePlaceSchema}
        onSubmit={(
          { title, description }: UpdatePlaceSchema,
          { setSubmitting }
        ) => {
          setSubmitting(true);
          mutate({ title, description });
          setSubmitting(false);
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
            <Button type="submit" disabled={isSubmitting || !isValid}>
              {isSubmitting ? 'SUBMITTING...' : 'UPDATE PLACE'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default UpdatePlace;