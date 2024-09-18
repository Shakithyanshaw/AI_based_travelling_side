import React, { useState, useRef, useEffect } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { Form } from 'react-bootstrap';

import Card from 'react-bootstrap/Card';
import Maps from './Map'; // Importing the Maps component
import Suggestion from './Suggestion'; // Importing the Suggestion component

import { getLocationInfo } from './api/api2'; // Importing the function to fetch location information

export default function Hotel() {
  // State variables for places, coordinates, and bounds
  const [places, setPlaces] = useState();
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  // Fetch user's geolocation when component mounts
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  // Fetch location information when coordinates or bounds change
  useEffect(() => {
    getLocationInfo(bounds.ne, bounds.sw).then((data) => {
      setPlaces(data);
    });
  }, [coordinates, bounds]);

  // Ref for the Autocomplete component
  const autoComplete1Ref = useRef(null);

  // State variable for the clicked child
  const [childClicked, setchildClicked] = useState(null);

  // Function to handle Autocomplete onLoad event
  const onLoad1 = (autocomplete) => {
    autoComplete1Ref.current = autocomplete;
  };

  // Function to handle Autocomplete onPlaceChanged event
  const onPlaceChanged1 = () => {
    if (autoComplete1Ref.current) {
      const place = autoComplete1Ref.current.getPlace();
      setCoordinates({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    }
  };

  return (
    <div
      className="container-fluid h-screen"
      style={{ backgroundColor: '#101418', height: '100%', overflow: 'hidden' }}
    >
      <div className="row h-screen">
        {/* Input section */}
        <div className="col-md-4 p-4">
          <Card className="h-full text-white bg-dark">
            <Card.Body className="">
              <div className="mt-1">
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label className="fs-5 fw-bold">Search Place</label>
                    {/* Autocomplete input for searching places */}
                    <Autocomplete
                      onLoad={onLoad1}
                      onPlaceChanged={onPlaceChanged1}
                    >
                      <Form.Control
                        type="text"
                        placeholder="Search..."
                        style={{
                          width: '100%',
                          backgroundColor: 'gray',
                          color: 'white',
                        }}
                        className=""
                      />
                    </Autocomplete>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
          {/* Suggestion section */}
          <div className="mt-2 flex flex-row  gap-x-10">
            <Card className="w-full text-white bg-dark ">
              <Card.Body>
                <Card.Title className="fs-5 fw-bold">
                  Hotels Near to You
                </Card.Title>
                {/* Render the Suggestion component with places */}
                <div>
                  <Suggestion pls={places} childClicked={childClicked} />
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>

        {/* Map section */}
        <div className="col-md-8 p-4 ">
          <Card
            style={{
              width: '100%',
              height: '80vh',
              backgroundColor: '#101418',
            }}
            className="h-full"
          >
            <Card.Body>
              {/* Render the Maps component */}
              <Maps
                setCoordinates={setCoordinates}
                setBounds={setBounds}
                coordinates={coordinates}
                places={places}
                setchildClicked={setchildClicked}
              />
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
