import React, { useEffect, useRef, useState } from 'react';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useGuessNumber from '../../hooks/useGuessNumber';
import './MagicNumber.css';

const MagicNumber = () => {
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
    <div className="mn-page">
      <div className="mn-container">
        <div className="mn-header">
          <h1>Magic Number</h1>
          <a
            data-testid="cal-github"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/CalCorbin/cal-portfolio/blob/master/src/pages/NumberDraw/NumberDraw.tsx"
          >
            <FontAwesomeIcon
              size="xl"
              style={{ color: 'white' }}
              icon={faGithub}
              className="social-icon"
            />
          </a>
        </div>
        <div className="mn-info">
          <strong>Instructions:</strong> In the canvas below, draw a number
          between 0 and 9. The machine learning model will try to guess what you
          are drawing.
        </div>
        <canvas
          ref={canvasRef}
          className="drawing-board"
          id="drawing-board"
          onMouseDown={() => setIsPainting(true)}
          onMouseUp={stopPaint}
          onMouseMove={paint}
        />
        <div className="mn-info">
          <div>
            Current Guess:
            {!data?.predicted && !isLoading && !isError && <p>None</p>}
            {isLoading && <p>Thinking...</p>}
            {isSuccess && <p>{guess}</p>}
            {isError && <p className="mn-error">Server Error</p>}
          </div>
          <button
            className="mn-button"
            type="button"
            id="clear"
            onClick={clearCanvas}
          >
            Clear Canvas
          </button>
        </div>
      </div>
    </div>
  );
};

export default MagicNumber;
