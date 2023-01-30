const Cell = ({ x, y, isMine, isRevealed, isFlagged, neighbourCount }) => {
  const handleClick = () => {
    if (isFlagged) return;
  };

  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
  };

  return (
    <div
      className={`cell ${isRevealed ? 'revealed' : ''} ${
        isFlagged ? 'flagged' : ''
      }`}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      {isRevealed && isMine && '💣'}
      {isRevealed && !isMine && neighbourCount > 0 && neighbourCount}
    </div>
  );
};

export default Cell;
