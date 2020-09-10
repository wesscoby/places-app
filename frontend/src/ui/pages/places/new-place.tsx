import React, { FC, ChangeEvent, useState, useContext } from 'react';
import { Formik, Form } from 'formik';
import Geocode from "react-geocode";
import { SyncLoader } from 'react-spinners';
import { Redirect } from 'react-router-dom';
import "@reach/combobox/styles.css";

import { Input, Button, SearchBox } from '../../components';
import { AuthContext } from '../../../context';
import { newPlaceSchema, notify } from '../../../util';
import { useAddPlace, useImageUpload } from '../../../hooks';


interface NewPlaceSchema {
  title: string;
  description: string;
}

const NewPlace: FC = () => {
  const { user } = useContext(AuthContext);
  const [addPlace] = useAddPlace();
  const [uploadImage] = useImageUpload();
  const [file, setFile] = useState<File | null>(null);
  const [address, setAddress] = useState<string>('');
  const [isPlaceCreated, setIsPlaceCreated] = useState(false)
  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY!);

  const schemaValues: NewPlaceSchema = {
    title: '',
    description: '',
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files![0];
    setFile(file);
  }

  return (
    <>
      {isPlaceCreated && <Redirect to={`/${user!.id}/places`} />}
      <div className="place-form">
        <Formik
          initialValues={schemaValues}
          validationSchema={newPlaceSchema}
          onSubmit={async (
            { title, description }: NewPlaceSchema,
            { setSubmitting }
          ) => {
            try {
              if(!address) throw new Error('Address not valid');
              if(!file) throw new Error('Image not found. Upload one');

              const res = await Geocode.fromAddress(address);
              const coordinates = res.results[0].geometry.location;

              const image = await uploadImage(file!);
              if(!image) throw new Error('Image upload failed. Try again');

              const addedPlace = await addPlace({
                title, description, address, image, coordinates
              });

              if(addedPlace) {
                notify('Place created successfully', 'success', 500);
                setSubmitting(false);
                setTimeout(() => {
                  setIsPlaceCreated(true);
                }, 800);
              } else {
                throw new Error('Adding failed. Try again!');
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
              <input
                id="file"
                name="file"
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleChange}
                placeholder="Upload an image of place"
              />
              <SearchBox
                placeholder="Enter a valid address, or closest landmark"
                setFn={setAddress}
              />
              {isSubmitting ? <SyncLoader size={12} /> : (
                <Button type="submit" disabled={!isValid}>
                  ADD PLACE
                </Button>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default NewPlace;