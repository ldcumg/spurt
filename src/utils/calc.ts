export default function calc(doneCount: number, totalCount: number) {
  // 유효하지 않은 숫자(NaN 등)이거나 분모가 0 이하인 경우
  if (!Number.isFinite(totalCount) || totalCount <= 0) return 0;
  if (!Number.isFinite(doneCount) || doneCount <= 0) return 0;

  const percentage = (doneCount / totalCount) * 100;

  // 0 ~ 100 사이 범위로 제한 (음수 또는 초과값 방어)
  const clamped = Math.min(Math.max(percentage, 0), 100);

  return Math.floor(percentage);
}
