import { useState } from 'react';

const MineSweeper = () => {
  const [count, setCount] = useState(0);

  return (
    <div data-testid="mine-sweeper-container">
      <div>Count is {count}</div>
      <button type="button" onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
};

export default MineSweeper;
