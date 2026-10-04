export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const NAME_MAX_LENGTH = 20;
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 72;

export const VALIDATION_MESSAGES = {
  nameRequired: "닉네임을 입력해주세요.",
  emailRequired: "이메일을 입력해주세요.",
  emailInvalid: "이메일 형식이 올바르지 않습니다.",
  passwordRequired: "비밀번호를 입력해주세요.",
  passwordTooShort: `비밀번호는 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`,
  passwordMismatch: "비밀번호가 일치하지 않습니다.",
} as const;
