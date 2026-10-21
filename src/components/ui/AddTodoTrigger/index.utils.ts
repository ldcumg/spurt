import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE, TITLE_MAX_LENGTH } from "./index.constants";
import { EMOJI_REGEX } from "@/constants/regex";
import type { GoalResponse } from "@/types/goals.types";

/** title 유효성 검사 */
export function validateTitle(titleInput: string, setError: (errorMassage: string) => void) {
  const titleValue = titleInput.trim();

  if (titleValue.length === 0) {
    setError("제목을 입력해 주세요");
    return true;
  }

  if (EMOJI_REGEX.test(titleValue)) {
    setError("이모티콘은 사용할 수 없습니다");
    return true;
  }

  if (titleValue.length > TITLE_MAX_LENGTH) {
    setError(`${TITLE_MAX_LENGTH}자 이하로 입력해 주세요`);
    return true;
  }

  setError("");
  return false;
}

/** 목표 선택 유효성 검사 */
export function validateGoal(selectedGoal: GoalResponse | null, setError: (errorMassage: string) => void) {
  if (!selectedGoal) {
    setError("목표를 선택해 주세요");
    return true;
  }

  setError("");
  return false;
}

/** 마감 기한 유효성 검사 */
export function validateDueDate(selectedDate: Date | null, setError: (errorMassage: string) => void) {
  if (selectedDate && selectedDate.toDateString() === "Invalid Date") {
    setError("잘못된 날짜 형식입니다");
    return true;
  }

  setError("");
  return false;
}

/** 파일 선택 유효성 검사 */
export function validateFile(
  event: React.FocusEvent<HTMLInputElement, Element>,
  setError: (errorMassage: string) => void,
) {
  const files = event.target.files;

  if (!files) {
    setError("");
    return false;
  }

  const file = files[0];
  const fileExtension = file.name.match(/\.[^.]+$/)?.[0].toLowerCase();

  if (!fileExtension || !ALLOWED_FILE_TYPES.includes(fileExtension)) {
    setError(`${ALLOWED_FILE_TYPES.join(", ")}만 업로드할 수 있습니다`);
    return true;
  }

  if (file.size > MAX_FILE_SIZE) {
    setError("파일 크기는 10MB 이하로 설정해 주세요");
    return true;
  }

  setError("");
  return false;
}

/** linkUrl 유효성 검사 */
export function validateLinkUrl(linkInput: string, setError: (errorMassage: string) => void) {
  const linkValue = linkInput.trim();

  if (linkValue.length === 0) {
    setError("");
    return false;
  }

  try {
    const url = new URL(linkValue);

    if (!["http:", "https:"].includes(url.protocol)) {
      setError("http 또는 https 링크만 입력할 수 있습니다.");
      return true;
    }
  } catch {
    setError("올바른 링크를 입력해주세요.");
    return true;
  }

  setError("");
  return false;
}
