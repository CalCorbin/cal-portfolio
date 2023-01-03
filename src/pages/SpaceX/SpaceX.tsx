import React from 'react';
import { useQuery, gql } from '@apollo/client';
import './SpaceX.css';
import Ship from '../../components/Ship/Ship';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading';
import { IShip } from '../../components/Ship/ShipInterface';

export const GET_SHIPS = gql`
  query {
    ships {
      id
      name
      home_port
      image
      active
      weight_lbs
      url
      missions {
        flight
        name
      }
    }
  }
`;

const SpaceX = () => {
  const { loading, error, data } = useQuery(GET_SHIPS);

  if (loading) return <Loading />;
  if (error) return <p data-testid="error-state">Error...</p>;

  return (
    <div data-testid="spacex-page" className="spacex-page">
      <Header
        title="SpaceX Marine Transport Ships"
        repoLink="https://github.com/CalCorbin/cal-portfolio/tree/master/src/pages/SpaceX/SpaceX.tsx"
      />
      <hr />
      <div className="ship-container">
        {data.ships.map((ship: IShip['ship']) => (
          <Ship key={ship.id} ship={ship} />
        ))}
      </div>
    </div>
  );
};

export default SpaceX;
