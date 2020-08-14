import React, { FC } from 'react';
import { Formik, Form } from 'formik';

import { Input, Button } from '../../components';
import { newPlaceSchema } from '../../util';


interface NewPlaceSchema {
  title: string;
  description: string;
  address: string;
}

const NewPlace: FC = () => {
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
          console.log({ title, description, address })
          setSubmitting(true);
          setTimeout(() => {
            setSubmitting(false);
          }, 3000);
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