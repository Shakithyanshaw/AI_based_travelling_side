import React, { useState, useRef, useEffect } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { Form } from 'react-bootstrap';

import Card from 'react-bootstrap/Card';
import Maps from './Map';
import Suggestion from './Suggestion';

import { getLocationInfo } from './api/api';

// Screen component
export default function Screen() {
  // State for storing places data
  const [places, setPlaces] = useState();
  // State for coordinates
  const [coordinates, setCoordinates] = useState({});
  // State for bounds
  const [bounds, setBounds] = useState({});

  // Get user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  // Fetch places data based on coordinates and bounds
  useEffect(() => {
    getLocationInfo(bounds.ne, bounds.sw).then((data) => {
      setPlaces(data);
    });
  }, [coordinates, bounds]);

  // Reference for autocomplete
  const autoComplete1Ref = useRef(null);

  // State for child clicked
  const [childClicked, setchildClicked] = useState(null);

  // Function to handle autocomplete load
  const onLoad1 = (autocomplete) => {
    autoComplete1Ref.current = autocomplete;
  };

  // Function to handle place change in autocomplete
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
        {/* Input */}
        <div className="col-md-4 p-4">
          <Card className="h-full text-white bg-dark">
            <Card.Body className="">
              <div className="mt-1">
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label className="fs-5 fw-bold">Search Place</label>
                    {/* Autocomplete input */}
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
          {/* Places suggestion */}
          <div className="mt-2 flex flex-row gap-x-10">
            <Card className="w-full text-white bg-dark ">
              <Card.Body>
                <Card.Title className="fs-5 fw-bold">
                  Places Near to You
                </Card.Title>
                <div>
                  {/* Display places suggestions */}
                  <Suggestion pls={places} childClicked={childClicked} />
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>

        {/* Map */}
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
              {/* Render map component */}
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
