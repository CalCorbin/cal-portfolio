// Shape field format is "lat,lng,precision"
export const parsePoint = (
  shape: string | null | undefined
): [number, number] | null => {
  if (!shape) return null;
  const [lat, lng] = shape.split(',').map(parseFloat);
  if (isNaN(lat) || isNaN(lng)) return null;
  return [lat, lng];
};
