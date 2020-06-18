import React from 'react';
import './styles.css';

export default function ConstructionSign() {
  return (
    <div>
      <div
        data-testid="construction-sign"
        className="__construction-sign"
      >
        <p>
          Currently under construction
        </p>
        <a
          className="link"
          href="https://www.linkedin.com/in/calcorbin/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Reach me here for now
        </a>
      </div>
    </div>
  );
}
