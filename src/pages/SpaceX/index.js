import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { useQuery, gql } from '@apollo/client';
import './SpaceX.css';
import Ship from '../../components/Ship';

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

  if (loading) return <p data-testid="loading-state">Loading...</p>;
  if (error) return <p data-testid="error-state">Error...</p>;

  return (
    <div data-testid="spacex-page" className="spacex-page">
      <div className="spacex-page-header">
        <div>SpaceX Marine Transport Ships</div>
        <a
          data-testid="cal-github"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/CalCorbin/cal-portfolio/tree/master/src/pages/SpaceX/index.js"
        >
          <FontAwesomeIcon size="sm" icon={faGithub} className="social-icon" />
        </a>
      </div>
      <hr />
      <div className="ship-container">
        {data.ships.map((ship) => (
          <Ship key={ship.id} ship={ship} />
        ))}
      </div>
    </div>
  );
};

export default SpaceX;
