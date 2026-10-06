// TODO - 정규식
import type { GoalResponse } from "@/types/goals.types";

/** title 유효성 검사 */
export const validateTitle = (
  event: React.FocusEvent<HTMLInputElement, Element>,
  setError: (errorMassage: string) => void,
) => {
  const title = event.target.value.trim();

  if (!title) {
    setError("제목을 입력해 주세요");
    return;
  }
};

/** 목표 선택 유효성 검사 */
export const validateGoal = (selectedGoal: GoalResponse | null, setError: (errorMassage: string) => void) => {
  if (!selectedGoal) {
    setError("목표를 선택해 주세요");
    return;
  }
};

/** 마감기한 유효성 검사 */
export const validateDueDate = (selectedDate: Date | null, setError: (errorMassage: string) => void) => {
  if (!selectedDate) {
    setError("마감 기한을 선택해 주세요");
    return;
  }
};

/** 파일 선택 유효성 검사 */
export const validateFile = (
  event: React.FocusEvent<HTMLInputElement, Element>,
  setError: (errorMassage: string) => void,
) => {
  const file = event.target.value;

  if (!file) {
    setError("파일을 선택해 주세요");
    return;
  }
};

/** linkUrl 유효성 검사 */
export const validateLinkUrl = (
  event: React.FocusEvent<HTMLInputElement, Element>,
  setError: (errorMassage: string) => void,
) => {
  const linkUrl = event.target.value.trim();

  if (!linkUrl) {
    setError("링크를 입력해 주세요");
    return;
  }
};
