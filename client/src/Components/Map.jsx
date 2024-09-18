import GoogleMapReact from 'google-map-react';
import { FaLocationDot } from 'react-icons/fa6';
import Card from 'react-bootstrap/Card';
import { Rating } from '@mui/material';

const LocationCard = ({ place }) => (
  <Card style={{ width: '8rem' }}>
    <Card.Img
      variant="top"
      src={
        place.photo
          ? place.photo.images.large.url
          : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
      }
    />
    <Card.Body className="flex flex-col">
      <Card.Text className="text-xxs">{place.name}</Card.Text>
      <Rating size="small" value={Number(place.rating)} />
    </Card.Body>
  </Card>
);

export default function Map({
  setCoordinates,
  setBounds,
  coordinates,
  places,
  setchildClicked,
}) {
  const handleChildClick = (key) => {
    // Find the clicked place by its key
    const clickedPlace = places.find((place) => place.key === key);
    if (clickedPlace) {
      // Update the map's center to the clicked place's coordinates
      setCoordinates({
        lat: clickedPlace.latitude,
        lng: clickedPlace.longitude,
      });
    }
    // Set the clicked place as the child clicked
    setchildClicked(key);
  };

  return (
    <div className="w-full h-full">
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          key={JSON.stringify(places)} // Unique key based on places data
          bootstrapURLKeys={{ key: 'your key' }} // Replace with your Google Maps API key
          defaultCenter={coordinates}
          center={coordinates}
          defaultZoom={15}
          margin={[50, 50, 50, 50]}
          options={{
            disableDefaultUI: true,
            zoomControl: true,
            styles: [
              {
                featureType: 'all',
                elementType: 'geometry',
                stylers: [
                  {
                    color: '#242f3e',
                  },
                ],
              },
              {
                featureType: 'all',
                elementType: 'labels.text.stroke',
                stylers: [
                  {
                    visibility: 'on',
                  },
                  {
                    color: '#242f3e',
                  },
                ],
              },
              {
                featureType: 'all',
                elementType: 'labels.text.fill',
                stylers: [
                  {
                    color: '#f79c0b',
                  },
                ],
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [
                  {
                    visibility: 'on',
                  },
                  {
                    color: '#464d55',
                  },
                ],
              },
              // Add more styles as needed for different map features
            ],
          }}
          onChange={(e) => {
            setCoordinates({ lat: e.center.lat, lng: e.center.lng });
            setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
          }}
          onChildClick={(key) => handleChildClick(key)}
        >
          {places?.map((place, i) =>
            Number(place.latitude) && Number(place.longitude) ? (
              <div
                className="map-marker"
                lat={Number(place.latitude)}
                lng={Number(place.longitude)}
                key={place.key}
              >
                <FaLocationDot fontSize={30} />
                <LocationCard place={place} />
              </div>
            ) : null
          )}
        </GoogleMapReact>
      </div>
    </div>
  );
}
