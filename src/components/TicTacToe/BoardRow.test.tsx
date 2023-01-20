import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BoardRow from './BoardRow';

describe('BoardRow', () => {
  const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  it('should render', () => {
    render(
      <BoardRow row={0} rowIndex={0} onCellClick={jest.fn()} board={board} />
    );
    expect(screen.getByTestId('cell-0-0')).toBeInTheDocument();
    expect(screen.getByTestId('cell-0-0')).toHaveClass('border-bottom');
    expect(screen.getByTestId('cell-0-0')).toHaveClass('border-right');
  });

  it('should render top right cell', () => {
    render(
      <BoardRow row={0} rowIndex={2} onCellClick={jest.fn()} board={board} />
    );
    expect(screen.getByTestId('cell-0-2')).toBeInTheDocument();
    expect(screen.getByTestId('cell-0-2')).toHaveClass('border-bottom');
    expect(screen.getByTestId('cell-0-2')).not.toHaveClass('border-right');
  });

  it('should render the bottom row with right classes', async () => {
    render(
      <BoardRow row={2} rowIndex={0} onCellClick={jest.fn()} board={board} />
    );
    expect(screen.getByTestId('cell-2-0')).toBeInTheDocument();
    expect(screen.getByTestId('cell-2-0')).toHaveClass('border-right');
    expect(screen.getByTestId('cell-2-0')).not.toHaveClass('border-bottom');
  });

  it('should trigger click event', async () => {
    const onCellClick = jest.fn();
    render(
      <BoardRow row={2} rowIndex={0} onCellClick={onCellClick} board={board} />
    );
    expect(screen.getByTestId('cell-2-0')).toHaveTextContent('');
    screen.getByTestId('cell-2-0').click();
    expect(onCellClick).toHaveBeenCalled();
  });

  it('should trigger keydown event', async () => {
    const onCellClick = jest.fn();
    render(
      <BoardRow row={2} rowIndex={0} onCellClick={onCellClick} board={board} />
    );
    expect(screen.getByTestId('cell-2-0')).toHaveTextContent('');
    const cell = screen.getByTestId('cell-2-0');
    fireEvent.keyDown(cell, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(onCellClick).toHaveBeenCalled();
  });
});
