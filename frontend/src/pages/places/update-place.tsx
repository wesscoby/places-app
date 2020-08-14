import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Formik, Form } from 'formik';

import { Input, Button, Card } from '../../components';
import { updatePlaceSchema } from '../../util';


interface ParamTypes {
  pid: string
}

interface UpdatePlaceSchema {
  title: string;
  description: string;
}

const fetchPlaceById = async (pid: string) => {
  const res = await fetch(`/api/places/${pid}`);
  return res.json();
}

const UpdatePlace: FC = () => {
  const { pid } = useParams<ParamTypes>();
  const { data, error, status } = useQuery(pid, fetchPlaceById, {
    refetchOnWindowFocus: false
  });

  if(status === "loading") return <p>Loading...</p>;
  if(status === "error") return <p>Error! {error?.message}</p>;
  
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
          console.log({ title, description })
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
            <Button type="submit" disabled={isSubmitting || !isValid}>
              UPDATE PLACE
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default UpdatePlace;