import React, { FC } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';

import { LatLng, mapConfig } from '../../../../util';


interface Props {
  className?: string;
  style?: any;
  center: LatLng;
  zoom: number;
}

const Map: FC<Props> = ({ center, zoom }) => {
  const { containerStyle, options } = mapConfig;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={zoom} center={center}
      options={options}
    >
      <Marker position={center} />
    </GoogleMap>
  )
}

export default Map;