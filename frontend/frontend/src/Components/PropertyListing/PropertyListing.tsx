import React, { useContext, useEffect, useState } from 'react'
import uuid from 'react-uuid';
import Tile from '../Tile/Tile';
import type { PropertyListing as PropertyListingType } from '../../dataTypes';
import { Col, Row } from 'react-bootstrap';
import { ThemContext } from '../../ThemContext';

type Props = {}

const PropertyListing = (props: Props) => {

  const [theme] = useContext(ThemContext) ?? ['dark', () => {}];
  const dark = theme === 'dark';

  const [propertyListingResult, setPropertyListingResult] = useState<PropertyListingType[]>([])

  useEffect(() => {
    fetch('http://localhost:5200/api/PropertyListings')
      .then(response => response.json())
      .then(data => {
        setPropertyListingResult(data);
      });
  }, []);

  return (
    <div className={`min-vh-100 p-4 ${dark ? 'bg-dark' : 'bg-light'}`}>
      <h3 className={`mx-2 mb-4 ${dark ? 'text-light' : 'text-dark'}`}>
        Listings available
      </h3>
      <Row className="g-3">
        {propertyListingResult.length > 0 ? (
          propertyListingResult.map((result) => (
            <Col key={uuid()} xs={12} sm={6} md={4} lg={3}>
              <Tile
                type={result.propertyType}
                value={"INR " + result.propertyValue}
                info={result.propertyInfo}
              />
            </Col>
          ))
        ) : (
          <p className={dark ? 'text-secondary' : 'text-muted'}>
            No property listings available.
          </p>
        )}
      </Row>
    </div>
  )
}

export default PropertyListing