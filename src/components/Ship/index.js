import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Ship.css';

function Ship({ ship }) {
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
        </button>
        {isOpen ? (
          <div className="modal">
            <div>Mission Name: foo</div>
            <div>Flight Number: bar</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

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
    missions: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default Ship;
