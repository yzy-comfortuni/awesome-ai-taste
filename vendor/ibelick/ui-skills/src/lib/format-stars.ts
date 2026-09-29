export const formatStarCount = (count: number) => {
  if (count < 1000) {
    return `${count}+`;
  }

  const rounded = Math.round((count / 1000) * 10) / 10;
  const value = Number.isInteger(rounded) ? `${rounded.toFixed(0)}k` : `${rounded.toFixed(1)}k`;

  return `${value}+`;
};
