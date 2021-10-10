export function getSimpleMovingAverage(values: number[], window = 5): number[] {
  if (!values || values.length < window) {
    return [];
  }

  let index = window - 1;
  const length = values.length + 1;

  const simpleMovingAverages = [];

  while (++index < length) {
    const windowSlice = values.slice(index - window, index);
    const sum = windowSlice.reduce(
      (prev: number, curr: number) => prev + curr,
      0
    );
    simpleMovingAverages.push(sum / window);
  }

  return simpleMovingAverages;
}
