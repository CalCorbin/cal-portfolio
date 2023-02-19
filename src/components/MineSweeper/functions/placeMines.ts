export default function placeMines({
  height,
  width,
  mines,
}: {
  height: number;
  width: number;
  mines: number;
}) {
  const minePlacements: number[][] = [];
  for (let i = 0; i < mines; i += 1) {
    const x = Math.floor(Math.random() * height);
    const y = Math.floor(Math.random() * width);

    // Here we check if mine is already placed at this position
    if (!minePlacements.some((el) => el[0] === x && el[1] === y)) {
      minePlacements.push([x, y]);
    } else i -= 1;
  }
  return minePlacements;
}
