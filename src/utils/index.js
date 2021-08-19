export const getRandomRating = (m = 2, n = 5) => (Math.random() * (n - m)) + m; 

export const getRandomCount = (m = 1, n = 50) => Math.floor((Math.random() * (n - m + 1)) + m); 