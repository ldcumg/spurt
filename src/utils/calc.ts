export default function calc(doneCount: number, totalCount: number) {
  const percentage = (doneCount / totalCount) * 100;

  return Math.floor(percentage);
}
