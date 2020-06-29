import React from 'react';
import './styles.css';

export default function NavButton(props) {
  return (
    <div>
      <div
        data-testid="nav-button"
        className="__button-container"
      >
        <p>{props.buttonText}</p>
      </div>
    </div>
  );
}
