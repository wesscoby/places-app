import React, { FC } from 'react';
import { Formik, Form } from 'formik';

import { Input, Button } from '../../components';
import { newPlaceSchema } from '../../../util';
import { useAddPlace } from '../../../hooks';


interface NewPlaceSchema {
  title: string;
  description: string;
  address: string;
}

const NewPlace: FC = () => {
  const [mutate] = useAddPlace();
  const schemaValues: NewPlaceSchema = {
    title: '',
    description: '',
    address: ''
  };
  
  return (
    <div className="place-form">
      <Formik
        initialValues={schemaValues}
        validationSchema={newPlaceSchema}
        onSubmit={(
          { title, description, address }: NewPlaceSchema, 
          { setSubmitting }
        ) => {
          setSubmitting(true);
            // TODO Change hard-coded data [later]
          mutate({
            title, description, address,
            location: {
              lat: 5.611074,
              lng: -0.069404
            },
            image: 'https://images.homify.com/image/upload/a_0,c_fill,f_auto,h_900,q_auto,w_1920/v1518452946/p/photo/image/2433418/Scene_2a.jpg',
            userId: '4'
          });
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
            <Input
              label="Address"
              name="address"
              placeholder="Enter a valid address"
              errorText={errors.address}
            />
            <Button type="submit" disabled={isSubmitting || !isValid}>
              ADD PLACE
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default NewPlace;