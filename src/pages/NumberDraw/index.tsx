import React, { useState } from 'react';
import './NumberDraw.css';

const NumberDraw = () => {
  const [isPainting, setIsPainting] = useState(false);
  const canvas = document.getElementById('drawing-board') as HTMLCanvasElement;
  const ctx = canvas?.getContext('2d');
  const canvasOffsetX: number = canvas?.offsetLeft;
  const canvasOffsetY: number = canvas?.offsetTop;

  const clearCanvas = () => {
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const stopPaint = () => {
    if (!ctx) return;

    setIsPainting(false);
    ctx.stroke();
    ctx.beginPath();
  };

  const paint = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!ctx || !isPainting) return;

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'white';
    ctx.lineTo(event.clientX - canvasOffsetX, event.clientY - canvasOffsetY);
    ctx.stroke();
  };

  return (
    <div>
      <h1>Number Draw</h1>
      <canvas
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
