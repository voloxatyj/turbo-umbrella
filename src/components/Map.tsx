import { useState, useCallback, memo } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import config from '../config/config';

const mapContainerStyle = {
  width: 'max-width',
  height: '450px',
  border: '2px outset',
  borderRadius: '5px',
  padding: '1px',
  marginBottom: '20px',
};

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: config.maps_api_id,
    googleMapsApiKey: config.maps_api_key,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map: any) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={13}
      center={config.coordinates}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <MarkerF position={config.coordinates} label={config.address} />
    </GoogleMap>
  ) : (
    <div className='map-container'>
      <h1>Loading...</h1>
    </div>
  );
}

export default memo(Map);
