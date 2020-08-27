import React, { FC, useRef, useEffect } from 'react';

import { LatLng } from '../../../../util';


declare global {
  interface Window { ol: any; }
}
window.ol = window.ol || {};

interface Props {
  className?: string;
  style?: any;
  center: LatLng;
  zoom: number;
}

const Map: FC<Props> = ({ 
  className = "", style = {}, center, zoom
}) => {

  const mapRef = useRef<any>();

  useEffect(() => {
    new window.ol.Map({
      target: mapRef.current.id,
      controls: window.ol.control.defaults({ attribution: false }),
      layers: [
        new window.ol.layer.Tile({
          source: new window.ol.source.OSM()
        }),

        new window.ol.layer.Vector({
          source: new window.ol.source.Vector({
            features: [
              new window.ol.Feature({
                geometry: new window.ol.geom.Point(window.ol.proj.fromLonLat([center.lng, center.lat]))
              })
            ]
          })
        })
      ],
      view: new window.ol.View({
        center: window.ol.proj.fromLonLat([center.lng, center.lat]),
        zoom: zoom,
        maxZoom: 18
      }),
    });
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${className}`}
      style={style}
      id="map"
    />
  );
}

export default Map;