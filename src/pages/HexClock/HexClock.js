import React, { useState, useEffect } from 'react';
import './HexClock.css';
import Header from '../../components/Header/Header';

const HexClock = () => {
  const [time, setTime] = useState();
  const [hex, setHex] = useState(null);
  const [colorName, setColorName] = useState('n/a');

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

    const fetchColorName = async () => {
      const response = await fetch(`https://www.thecolorapi.com/id?hex=${hex}`);
      const data = await response.json();
      setColorName(data.name.value);
    };

    setUpTime();
    fetchColorName();
    setTimeout(setUpTime, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [time]);

  return (
    <div data-testid="hexclock-page" id="hex" className="hexclock-page">
      <Header
        title="HexClock"
        repoLink="https://github.com/CalCorbin/cal-portfolio/blob/master/src/pages/HexClock/index.js"
        useWhiteIcons
      />
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
};

export default HexClock;
