export const createArrayFromNumber = (value: number) => {
  return Array(value)
    .fill(undefined)
    .map((_, index) => index + 1);
};
