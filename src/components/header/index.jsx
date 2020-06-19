import React from 'react';
import './styles.css';

export default function Header(props) {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  );
}
