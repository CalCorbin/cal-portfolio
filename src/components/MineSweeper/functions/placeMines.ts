export default function placeMines({
  height,
  width,
  mines,
  firstMine,
}: {
  height: number;
  width: number;
  mines: number;
  firstMine?: number[] | undefined;
}) {
  const minePlacements: number[][] = [];
  let handledFirstMine = false;
  for (let i = 0; i < mines; i += 1) {
    const x = Math.floor(Math.random() * height);
    const y = Math.floor(Math.random() * width);

    // Here we check if mine is placed on the first click position
    if (
      firstMine &&
      !handledFirstMine &&
      x === firstMine[0] &&
      y === firstMine[1]
    ) {
      i -= 1;
      handledFirstMine = true;
    }
    // Here we check if mine is already placed at this position
    else if (!minePlacements.some((el) => el[0] === x && el[1] === y)) {
      minePlacements.push([x, y]);
    } else i -= 1;
  }
  return minePlacements;
}
