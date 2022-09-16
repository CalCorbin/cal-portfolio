import React, { useEffect, useRef, useState } from 'react';
import useGuessNumber from '../../hooks/useGuessNumber';
import './NumberDraw.css';

const NumberDraw = () => {
  const [isPainting, setIsPainting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext('2d');
  const [loadCanvas, setLoadCanvas] = useState(false);
  const [numberImage, setNumberImage] = useState<File | null>(null);
  const [guess, setGuess] = useState('None');

  const mutation = useGuessNumber(numberImage);
  const { mutate: guessNumber, isError, isSuccess, isLoading, data } = mutation;

  if (ctx && canvas && loadCanvas) {
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'white';
    setLoadCanvas(false);
  }

  useEffect(() => {
    if (!loadCanvas) setLoadCanvas(true);
  }, []);

  useEffect(() => {
    if (data?.predicted[0]) {
      setGuess(data?.predicted[0]);
    }
  }, [data]);

  const clearCanvas = () => {
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setGuess('None');
  };

  function debounce(fn: () => void, delay: number) {
    let timer: NodeJS.Timeout;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(fn, delay);
    };
  }

  const debounced = debounce(() => {
    guessNumber();
  }, 500);

  const stopPaint = () => {
    if (!ctx || !canvas) return;

    setIsPainting(false);
    ctx.stroke();
    ctx.beginPath();

    debounced();
  };

  const paint = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!ctx || !isPainting || !canvas) return;

    const canvasOffsetX: number = canvas.offsetLeft;
    const canvasOffsetY: number = canvas.offsetTop;

    ctx.lineTo(event.clientX - canvasOffsetX, event.clientY - canvasOffsetY);
    ctx.stroke();
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const image = await new File([blob], 'number.png', { type: 'image/png' });
      await setNumberImage(image);
    });
  };

  if (!canvasRef) return null;

  return (
    <div>
      <h1>Number Draw</h1>
      <canvas
        ref={canvasRef}
        className="drawing-board"
        id="drawing-board"
        onMouseDown={() => setIsPainting(true)}
        onMouseUp={stopPaint}
        onMouseMove={paint}
      />
      <div>
        Current Guess:
        {!data?.predicted && !isLoading && !isError && <p>None</p>}
        {isLoading && <p>Thinking...</p>}
        {isSuccess && <p>{guess}</p>}
        {isError && (
          <p className="error-message">
            There was an error while guessing your submission
          </p>
        )}
      </div>
      <button type="button" id="clear" onClick={clearCanvas}>
        Clear
      </button>
    </div>
  );
};

export default NumberDraw;
