import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import styles from './HexClock.module.css';

const HexClock = () => {
  const [time, setTime] = useState<string>();
  const [hex, setHex] = useState<string | null>(null);
  const [colorName, setColorName] = useState('n/a');

  useEffect(() => {
    const setUpTime = () => {
      const date = new Date();
      let hours: number | string = date.getHours();
      let minutes: number | string = date.getMinutes();
      let seconds: number | string = date.getSeconds();

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
    const timer = setTimeout(setUpTime, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [time]);

  return (
    <div
      data-testid="hexclock-page"
      id="hex"
      className={styles['hexclock-page']}
    >
      <Header
        title="HexClock"
        repoLink="https://github.com/CalCorbin/cal-portfolio/blob/main/src/components/HexClock/HexClock.tsx"
        useDarkMode
      />
      <div className={styles['hex-content']}>
        <div className={styles['time-text']} data-testid="time-display">
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
