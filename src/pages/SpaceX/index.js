import React from 'react';
import { useQuery, gql } from '@apollo/client';
import './SpaceX.css';
import PropTypes from 'prop-types';

const GET_SHIPS = gql`
  query {
    ships {
      id
      name
      home_port
      image
    }
  }
`;

function Ship({ ship }) {
  return (
    <div className="ship-card">
      {ship.image ? (
        <img src={ship.image} alt="spacex ship" />
      ) : (
        <div>No Image Available</div>
      )}
      <div>Name: {ship.name}</div>
      <div>Home Port: {ship.home_port}</div>
    </div>
  );
}

Ship.defaultProps = {
  ship: null,
};

Ship.propTypes = {
  ship: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    home_port: PropTypes.string,
  }),
};

function SpaceX() {
  const { loading, error, data } = useQuery(GET_SHIPS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <div data-testid="spacex-page" className="spacex-page">
      <div className="section-header">SpaceX Ships</div>
      <hr />
      <div className="ship-container">
        {data.ships.map((ship) => (
          <Ship key={ship.id} ship={ship} />
        ))}
      </div>
    </div>
  );
}

export default SpaceX;
