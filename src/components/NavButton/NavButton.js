import React from 'react';
import './styles.css';
import PropTypes from 'prop-types';

const NavButton = function (props) {
  const { buttonText } = props;

  return (
    <div>
      <div data-testid="nav-button" className="__button-container">
        <p>{buttonText}</p>
      </div>
    </div>
  );
};

NavButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
};

export default NavButton;
