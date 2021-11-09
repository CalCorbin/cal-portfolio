import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useQuery, gql } from '@apollo/client';
import './SpaceX.css';

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

function SpaceX() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMissionOpening = () => {
    setIsOpen((prev) => !prev);
  };

  const { loading, error, data } = useQuery(GET_SHIPS);

  if (loading) return <p data-testid="loading-state">Loading...</p>;
  if (error) return <p data-testid="error-state">Error...</p>;

  return (
    <div data-testid="spacex-page" className="spacex-page">
      <div className="spacex-page-header">
        <div>SpaceX Ships</div>
        <a
          data-testid="cal-github"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/CalCorbin/cal-portfolio/tree/master/src/pages/SpaceX"
        >
          <FontAwesomeIcon size="sm" icon={faGithub} className="social-icon" />
        </a>
      </div>
      <hr />
      <div className="ship-container">
        {data.ships.map((ship) => (
          <div
            className="ship-card"
            data-testid={`ship-${ship.id}`}
            key={ship.id}
          >
            <h2>{ship.name}</h2>
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
            <div className="ship-card-body">
              <div>
                <strong>Status:</strong> {ship.active ? 'Active' : 'Inactive'}
              </div>
              <div>
                <strong>Home Port:</strong> {ship.home_port}
              </div>
              <div>
                <strong>Weight:</strong> {ship.weight_lbs} lbs
              </div>
              <div>
                <strong>URL:</strong>{' '}
                {ship.url ? (
                  <a
                    href={ship.url}
                    target="_blank"
                    rel="noreferrer"
                    data-testid={`ship-url-${ship.id}`}
                  >
                    Marine Traffic Data
                  </a>
                ) : (
                  <div data-testid={`no-url-${ship.id}`}>
                    Marine Traffic Data Unavaiable
                  </div>
                )}
              </div>
              <button type="button" onClick={handleMissionOpening}>
                Missions
                {!isOpen ? (
                  <FontAwesomeIcon icon={faChevronDown} />
                ) : (
                  <FontAwesomeIcon icon={faChevronUp} />
                )}
              </button>
              {!isOpen ? (
                ship.missions.map((mission) => (
                  <div key={`flight-${mission.flight}`}>
                    <div>Mission Name: {mission.name}</div>
                    <div>Flight Number: {mission.flight}</div>
                  </div>
                ))
              ) : (
                <div />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpaceX;
