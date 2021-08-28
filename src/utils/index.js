export const getRandomRating = (m = 2, n = 5) => Math.random() * (n - m) + m;

export const getRandomCount = (m = 1, n = 50) =>
  Math.floor(Math.random() * (n - m + 1) + m);

export const capitalizeFirst = (s) => s[0].toUpperCase() + s.slice(1);

export const convertAmount = (amount) => {
  const rounded = Math.round(amount);
  return rounded
    .toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    .slice(0, -3);
};
