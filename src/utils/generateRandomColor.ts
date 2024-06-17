const getRandomColorValue = () => {
  return Math.floor(Math.random() * 255);
};

export const generateRandomColor = () => {
  return [getRandomColorValue(), getRandomColorValue(), getRandomColorValue()];
};