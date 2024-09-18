import React from 'react';
import Card from 'react-bootstrap/Card';
import { Chip, Rating } from '@mui/material';
import { CiLocationOn } from 'react-icons/ci';
import { BsTelephone } from 'react-icons/bs';

// Component to display details of a place
export default function Places({ place }) {
  // Function to handle click on a place card
  const handlePlaceClick = () => {
    // Redirect to the actual location using the Google Maps URL
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${place.name}`
    );
  };

  return (
    <div className=" flex mt-10 justify-center items-center">
      {/* Card displaying place details */}
      <Card
        style={{ width: '21rem' }}
        onClick={handlePlaceClick} // Handle click on the card
        className="cursor-pointer"
      >
        {/* Place image */}
        <Card.Img
          variant="top"
          src={
            place.photo
              ? place.photo.images.large.url
              : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
          }
        />
        <Card.Body>
          {/* Place name */}
          <Card.Title>{place.name}</Card.Title>
          {/* Ratings */}
          <Card.Text className="flex justify-between text-xs pl-1 pr-1 text-gray-400 mb-1">
            <div>Ratings</div>
            <Rating size="small" value={Number(place.rating)} />
          </Card.Text>
          {/* Price level */}
          <Card.Text className="flex justify-between text-xs pl-1 pr-1 text-gray-400 mb-1">
            <div>Price</div>
            <div>{place?.price_level}</div>
          </Card.Text>
          {/* Ranking */}
          <Card.Text className="flex flex-row justify-between text-xs pl-1 pr-1 text-gray-400 mb-1">
            <div>Ranking</div>
            <div>{place?.ranking}</div>
          </Card.Text>
          {/* Location */}
          <Card.Text className="flex flex-row justify-between text-xs pl-1 pr-1 text-gray-400 mb-1">
            <CiLocationOn />
            <div>{place?.location_string}</div>
          </Card.Text>
          {/* Phone number */}
          <Card.Text className="flex flex-row justify-between text-xs pl-1 pr-1 text-gray-400 mb-1">
            <BsTelephone />
            <div>{place?.phone}</div>
          </Card.Text>
          {/* Cuisine chips */}
          <Card.Text className="flex gap-x-2 text-xs pl-1 pr-1 text-gray-400 mb-0 mt-2 overflow-scroll">
            {/* Display cuisine chips */}
            {place?.cuisine?.map(({ name }) => (
              <Chip key={name} label={name} size="small"></Chip>
            ))}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
