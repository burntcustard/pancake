export const round = (num, precision = 0) => {
  const p = Math.pow(10, precision);
  const n = (num * p) * (1 + Number.EPSILON);
  return Math.round(n) / p;
}
