export const getColors = (colors: number[]) => {
  const parsedColors = [...colors];
  const newColors: IColor[] = [];

  if (parsedColors.length % 3 !== 0) return [];
  for (let c = 0; c < parsedColors.length; c += 3) {
    const r = parsedColors[c];
    const g = parsedColors[c + 1];
    const b = parsedColors[c + 2];
    newColors.push({ rgb: `rgb(${r}, ${g}, ${b})`, r, g, b });
  }
  return newColors;
};

export interface IColor {
  r: number;
  g: number;
  b: number;
  rgb: string;
}
