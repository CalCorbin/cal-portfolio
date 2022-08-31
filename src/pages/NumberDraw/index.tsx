import React, { useEffect, useRef, useState } from 'react';
import './NumberDraw.css';

const NumberDraw = () => {
  const [isPainting, setIsPainting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext('2d');
  const [loadCanvas, setLoadCanvas] = useState(false);

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

  const clearCanvas = () => {
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const stopPaint = () => {
    if (!ctx) return;

    setIsPainting(false);
    ctx.stroke();
    ctx.beginPath();
  };

  const paint = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!ctx || !isPainting || !canvas) return;

    const canvasOffsetX: number = canvas.offsetLeft;
    const canvasOffsetY: number = canvas.offsetTop;

    ctx.lineTo(event.clientX - canvasOffsetX, event.clientY - canvasOffsetY);
    ctx.stroke();
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
      <button type="button" id="clear" onClick={clearCanvas}>
        Clear
      </button>
    </div>
  );
};

export default NumberDraw;
