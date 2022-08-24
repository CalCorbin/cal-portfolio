import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Ship.css';

const Ship = ({ ship }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMissionOpening = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="ship-card" data-testid={`ship-${ship.id}`} key={ship.id}>
      <h2>{ship.name}</h2>
      {ship.image ? (
        <img
          src={ship.image}
          alt="spacex ship"
          data-testid={`ship-image-${ship.id}`}
        />
      ) : (
        <div data-testid={`ship-no-image-${ship.id}`}>No Image Available</div>
      )}
      <div className="ship-card-body">
        <div>
          <strong>Status:</strong> {ship.active ? 'Active' : 'Inactive'}
        </div>
        <div>
          <strong>Home Port:</strong> {ship.home_port}
        </div>
        <div>
          <strong>Weight:</strong>{' '}
          {ship.weight_lbs ? `${ship.weight_lbs} lbs` : 'Unknown'}
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
            <span data-testid={`no-url-${ship.id}`}>Data Unavaiable</span>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={handleMissionOpening}
        data-testid={`missions-button-${ship.id}`}
      >
        Missions
      </button>
      {isOpen ? (
        <div className="modal" data-testid={`missions-modal-${ship.id}`}>
          <div className="modal-content">
            <button
              type="button"
              onClick={handleMissionOpening}
              data-testid={`close-button-${ship.id}`}
            >
              x
            </button>
            <h2>{ship.name} Missions</h2>
            {ship.missions.map((mission) => (
              <div key={`flight-${mission.flight}`}>
                <div>
                  <strong>Mission Name:</strong> {mission.name}
                </div>
                <div>
                  <strong>Flight Number:</strong> {mission.flight}
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

Ship.defaultProps = {
  ship: null,
};

Ship.propTypes = {
  ship: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    home_port: PropTypes.string,
    active: PropTypes.bool,
    image: PropTypes.string,
    url: PropTypes.string,
    weight_lbs: PropTypes.number,
    missions: PropTypes.arrayOf(
      PropTypes.shape({
        flight: PropTypes.string,
        name: PropTypes.string,
      })
    ),
  }),
};

export default Ship;
