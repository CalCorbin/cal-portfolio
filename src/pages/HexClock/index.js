import React, { useState, useEffect } from 'react';
import './HexClock.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function HexClock() {
  const [time, setTime] = useState();
  const [hex, setHex] = useState();
  const [colorName, setColorName] = useState();

  let timer;
  useEffect(() => {
    const setUpTime = () => {
      const date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();

      if (hours <= 9) hours = `0${hours}`;
      if (minutes <= 9) minutes = `0${minutes}`;
      if (seconds <= 9) seconds = `0${seconds}`;

      setTime(`${hours}:${minutes}:${seconds}`);
      setHex(`${hours}${minutes}${seconds}`);

      document.body.style.background = `#${hex}`;
    };

    timer = () => {
      setTimeout(setUpTime, 1000);
    };

    const fetchColorName = async () => {
      const response = await fetch(`http://www.thecolorapi.com/id?hex=${hex}`);
      return response.json();
    };

    fetchColorName().then((data) => {
      if (data.name) setColorName(data.name.value);
    });

    setUpTime();
    timer();

    return () => {
      clearTimeout(timer);
    };
  }, [time]);

  return (
    <div data-testid="hexclock-page" id="hex" className="hexclock-page">
      <div className="hexclock-header">
        <div>HexClock</div>
        <a
          data-testid="cal-github"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/CalCorbin/cal-portfolio/blob/master/src/pages/HexClock/index.js"
        >
          <FontAwesomeIcon
            size="sm"
            style={{ color: 'white' }}
            icon={faGithub}
            className="social-icon"
          />
        </a>
      </div>
      <div className="hex-content">
        <div className="time-text" data-testid="time-display">
          {time}
        </div>
        <h1>Current color: {colorName}</h1>
        <p>
          This clock actively updates the page background color based on what
          time it is.
        </p>
        <p>
          Currently the time is {time} which correlates to the hex value #{hex}.
        </p>
      </div>
    </div>
  );
}

export default HexClock;
