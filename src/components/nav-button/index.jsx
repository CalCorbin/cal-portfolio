import React from 'react';
import './styles.css';

export default function NavButton(props) {
  return (
    <div>
      <div className="__button-container">
        <div>{props.buttonText}</div>
      </div>
    </div>
  );
}
