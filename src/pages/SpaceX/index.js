import React from 'react';
import { useQuery, gql } from '@apollo/client';
import './SpaceX.css';

export const GET_SHIPS = gql`
  query {
    ships {
      id
      name
      home_port
      image
    }
  }
`;

function SpaceX() {
  const { loading, error, data } = useQuery(GET_SHIPS);

  if (loading) return <p data-testid="loading-state">Loading...</p>;
  if (error) return <p data-testid="error-state">Error...</p>;

  return (
    <div data-testid="spacex-page" className="spacex-page">
      <div className="section-header">SpaceX Ships</div>
      <hr />
      <div className="ship-container">
        {data.ships.map((ship) => (
          <div
            className="ship-card"
            data-testid={`ship-${ship.id}`}
            key={ship.id}
          >
            {ship.image ? (
              <img
                src={ship.image}
                alt="spacex ship"
                data-testid={`ship-image-${ship.id}`}
              />
            ) : (
              <div data-testid={`ship-no-image-${ship.id}`}>
                No Image Available
              </div>
            )}
            <div>Name: {ship.name}</div>
            <div>Home Port: {ship.home_port}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpaceX;
