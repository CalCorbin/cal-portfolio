import React from 'react';
import './styles.css';

export default function Image(props) {
  return (
    <div>
      <img src={props.image} className="__image" alt="hello" />
    </div>
  );
}
