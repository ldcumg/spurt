export const validateTitle = (
  event: React.FocusEvent<HTMLInputElement, Element>,
  setError: (errorMassage: string) => void,
) => {
  const title = event.target.value.trim();

  if (!title) return setError("제목을 입력해주세요");
  if (title.length < 10) return "제목은 최소 10자 이상이어야 합니다";
  return "";
};

export const validateGoalId = (
  event: React.FocusEvent<HTMLInputElement, Element>,
  setError: (errorMassage: string) => void,
) => {
  const goalId = event.target.value.trim();

  if (!goalId) return setError("목표 아이디를 입력해주세요");
  if (goalId.length < 10) return "목표 아이디는 최소 10자 이상이어야 합니다";
  return "";
};

export const validateFile = (
  event: React.FocusEvent<HTMLInputElement, Element>,
  setError: (errorMassage: string) => void,
) => {
  const file = event.target.value.trim();

  if (!file) return setError("파일을 선택해주세요");
  if (file.length < 10) return "파일 이름은 최소 10자 이상이어야 합니다";
  return "";
};

export const validateLinkUrl = (
  event: React.FocusEvent<HTMLInputElement, Element>,
  setError: (errorMassage: string) => void,
) => {
  const linkUrl = event.target.value.trim();

  if (!linkUrl) return setError("링크를 입력해주세요");
  if (linkUrl.length < 10) return "링크 주소는 최소 10자 이상이어야 합니다";
  return "";
};
