export function getRandomIndexes(count: number, max: number): number[] {
  const result = new Set<number>();
  while (result.size < count) {
    result.add(Math.floor(Math.random() * max));
  }
  return Array.from(result);
}
